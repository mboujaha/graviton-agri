import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ROUTES} from '../../sidebar/sidebar-routes.config';

const misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0
};
declare const $: any;

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  private location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  @ViewChild('app-navbar') button;

  constructor(location: Location, private renderer: Renderer2, private element: ElementRef) {
    this.location = location;
    this.nativeElement = this.element.nativeElement;
    this.sidebarVisible = false;
  }



  ngOnInit() {
    this.listTitles = ROUTES.filter(title => title);

    const navbar: HTMLElement = this.element.nativeElement;

    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    if ($('body').hasClass('sidebar-mini')) {
      misc.sidebar_mini_active = true;
    }

    $('#minimizeSidebar').click(function () {
      const $btn = $(this);
      if (misc.sidebar_mini_active === true) {
        $('body').removeClass('sidebar-mini');
        misc.sidebar_mini_active = false;
      } else {
        setTimeout(function () {
          $('body').addClass('sidebar-mini');
          misc.sidebar_mini_active = true;
        }, 300);
      }
      const simulateWindowResize = setInterval(function () {
        window.dispatchEvent(new Event('resize'));
      }, 180);

      setTimeout(function () {
        clearInterval(simulateWindowResize);
      }, 1000);
    });
  }


  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];

    if (this.sidebarVisible === false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }

  getTitle() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(2);
    }
    this.listTitles.find(item => {
      return item.path === title;
    });

    return 'Dashboard';
  }

  isMobileMenu() {
    if ($(window).width() < 991) {
      return false;
    }
    return true;
  }

  getPath() {
    return this.location.prepareExternalUrl(this.location.path());
  }
}
