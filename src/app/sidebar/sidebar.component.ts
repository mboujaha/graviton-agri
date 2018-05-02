import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from './sidebar-routes.config';

declare const $: any;
let sidebarTimer;

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menuItems: any[];


  constructor() {
  }

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1;
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    if (isWindows) {
      const $sidebar = $('.sidebar .sidebar-wrapper, .main-panel');
      $sidebar.perfectScrollbar();
      $('html').addClass('perfect-scrollbar-on');
    } else {
      $('html').addClass('perfect-scrollbar-off');
    }
  }

  ngAfterViewInit(): void {
    const mda = {
      movingTab: '<div class="sidebar-moving-tab"/>',
      isChild: false,
      sidebarMenuActive: '',
      movingTabInitialised: false,
      distance: 0,

      setMovingTabPosition: function () {
        const $currentActive = $(mda.sidebarMenuActive);
          mda.distance = $currentActive.parent().position().top - 10;
        if ($currentActive.closest('.collapse'.length) !== 0) {
          const parent_distance = $currentActive.closest('.collapse').parent().position().top;
          mda.distance = mda.distance + parent_distance;
        }
        mda.moveTab();
      },

      initMovingTab: function () {
        mda.movingTab = $(mda.movingTab);
        mda.sidebarMenuActive = $('.sidebar .nav-container > .nav > li.active > a:not([data-toggle="collaps"]');
        if (mda.sidebarMenuActive.length !== 0) {
          mda.setMovingTabPosition();
        } else {
          mda.sidebarMenuActive = $('.sidebar .nav-container .nav > li.active .collapse li.active > a');
          mda.isChild = true;
          this.setParentCollapse();
        }
        $(mda.sidebarMenuActive).parent().addClass('visible');
        const button_text = $(mda.sidebarMenuActive).html();
        $(mda.movingTab).html(button_text);
        $('.sidebar .nav-container').append(mda.movingTab);
        $('.sidebar .nav .collapse').on('hidden.bs.collapse', () => {
          const $currentActive = mda.sidebarMenuActive;
          mda.distance = $($currentActive).parent().position().top - 10;
          if ($($currentActive).closest('.collapse').length !== 0) {
              const parent_distance = $($currentActive).closest('collapse').parent().position().top;
              mda.distance = mda.distance + parent_distance;
          }
          mda.moveTab();
        });
        $('.sidebar .nav .collapse').on('shownImage.bs.collapse', () => {
          const $currentActive = mda.sidebarMenuActive;
          mda.distance = $($currentActive).parent().position().top - 10;
          if ($($currentActive).closest('.collapse').length !== 0) {
            const parent_distance = $($currentActive).closest('collapse').parent().position().top;
            mda.distance = mda.distance + parent_distance;
          }
          mda.moveTab();
        });
        $('.sidebar .nav-container .nav > li > a:not([data-toggle="collapse"])').click(function (){
          mda.sidebarMenuActive = $(this);
          const $parent = $(this).parent();
          if ($(mda.sidebarMenuActive).closest('.collapse').length === 0) {
            mda.isChild = false;
          }
          clearTimeout(sidebarTimer);
          let $currentActive = mda.sidebarMenuActive;
          $('.sidebar .nav-container .nav li').removeClass('visible');
          const $movingTab = mda.movingTab;
          $($movingTab).addClass('moving');
          $($movingTab).css('padding-left', $($currentActive).css('padding-left'));
          const buttonText = $($currentActive).html();

          $currentActive = mda.sidebarMenuActive;
          mda.distance = $($currentActive).parent().position().top - 10;

          if ($($currentActive).closest('.collapse').length !== 0) {
            const parent_distance = $($currentActive).closest('.collapse').parent().position().top;
            mda.distance = mda.distance + parent_distance;
          }
          mda.moveTab();

          sidebarTimer = setTimeout(() => {
            $($movingTab).removeClass('moving');
            $($currentActive).parent().addClass('visible');
          }, 650);

          setTimeout(function () {
            $($movingTab).html(button_text);
          }, 10);

        });
      },

      setParentCollapse: function () {
        if (mda.isChild === true) {
          const $sidebarParent = $(mda.sidebarMenuActive).parent().parent().parent();
          const collapseId = $sidebarParent.siblings('a').attr('href');

          $(collapseId).collapse('show');

          $(collapseId).collapse()
            .on('shown.bs.collapse', () => {
              mda.setMovingTabPosition();
            })
            .on('hidden.bs.collapse', () => {
              mda.setMovingTabPosition();
            });
        }
      },

      animateMovingTab: function () {
        clearTimeout(sidebarTimer);
        const $currentActive = mda.sidebarMenuActive;

        $('.sidebar .nav-container .nav li').removeClass('visible');

        const $movingTab = mda.movingTab;
        $($movingTab).addClass('moving');
        $($movingTab).css('padding-left', $($currentActive).css('padding-left'));

        const buttonText = $($currentActive).html();
        mda.setMovingTabPosition();

        sidebarTimer = setTimeout(function () {
          $($movingTab).removeClass('moving');
          $($currentActive).parent().addClass('visible');
        }, 650);

        setTimeout(function () {
          $($movingTab).html(buttonText);
        }, 10);
      },

      moveTab: function () {
        $(mda.movingTab).css({
          'transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
          '-webkit-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
          '-moz-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
          '-ms-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
          '-o-transform': 'translate3d(0px,' + mda.distance + 'px, 0)'
        });
      }
    };
    setTimeout(() => {
      if (mda.movingTabInitialised === false) {
        mda.initMovingTab();
        mda.movingTabInitialised = true;
      }
    }, 10);
  }

  isNotMobileMenu() {
    return $(window).width() <= 991;
  }
}
