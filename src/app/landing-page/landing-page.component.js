"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var THREE = require("three");
var login_model_1 = require("../../models/login.model");
var STLLoader = require('three-stl-loader')(THREE);
var LandingPageComponent = /** @class */ (function () {
    function LandingPageComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        this.scene = null;
        this.camera = null;
        this.cameraTarget = null;
        this.loader = null;
        this.errorMessage = null;
        this.camera = new THREE.PerspectiveCamera(8, window.innerWidth / window.innerHeight, 1, 1000);
        this.cameraTarget = new THREE.Vector3(0, 0, 0);
        this.scene = new THREE.Scene();
        this.loader = new STLLoader();
        this.loader.load('/assets/logo3d.stl', function (geometry) {
            var material = new THREE.MeshPhongMaterial({ color: 0xF35F15, specular: null, shininess: 50 });
            material.transparent = true;
            material.opacity = 0.8;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.scale.set(0.035, 0.02, 0.02);
            _this.scene.add(mesh);
        });
        // Lights
        this.scene.add(new THREE.HemisphereLight(0x212121, 0x111122));
        this.addShadowedLight(1, 1, -1, 0xEDECEC, 1);
        this.addShadowedLight(1, 1, 1, 0xF69E6E, 1);
        this.addShadowedLight(-1, 1, 1, 0xF69E6E, 1);
    }
    LandingPageComponent.prototype.ngAfterViewInit = function () {
        this.renderer.setSize(window.innerWidth / 8, window.innerHeight / 6);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    };
    LandingPageComponent.prototype.animate = function () {
        var _this = this;
        window.requestAnimationFrame(function () { return _this.animate(); });
        var timer = Date.now() * 0.001;
        this.camera.position.x = Math.cos(timer) * 3;
        this.camera.position.z = Math.sin(timer) * 3;
        this.camera.lookAt(this.cameraTarget);
        this.renderer.render(this.scene, this.camera);
    };
    LandingPageComponent.prototype.ngOnInit = function () {
    };
    LandingPageComponent.prototype.onWindowResize = function (event) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth / 8, window.innerHeight / 6);
    };
    LandingPageComponent.prototype.addShadowedLight = function (x, y, z, color, intensity) {
        var directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(x, y, z);
        this.scene.add(directionalLight);
        directionalLight.castShadow = true;
        var d = 1;
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 4;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.bias = -0.002;
    };
    LandingPageComponent.prototype.submitForm = function (form) {
        var _this = this;
        var values = form.value;
        var login = new login_model_1.LoginModel();
        login.username = values.username;
        login.password = values.password;
        this.authService.login(login).subscribe(function (res) {
            _this.authService.setLoggedUser(res);
            console.log(res);
        }, function (err) {
            _this.errorMessage = err.message;
            form.reset();
        });
    };
    __decorate([
        core_1.ViewChild('rendererContainer')
    ], LandingPageComponent.prototype, "rendererContainer", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], LandingPageComponent.prototype, "onWindowResize", null);
    LandingPageComponent = __decorate([
        core_1.Component({
            selector: 'app-landing-page',
            templateUrl: './landing-page.component.html',
            styleUrls: ['./landing-page.component.css']
        })
    ], LandingPageComponent);
    return LandingPageComponent;
}());
exports.LandingPageComponent = LandingPageComponent;
