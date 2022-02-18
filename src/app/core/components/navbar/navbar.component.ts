import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signalr.service';
import { OrderHubModel } from '../models/order-hub-model';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { version } from '../../../../../package.json';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    role: string;
    fullname: string;
    app_version = version;

    location: Location;
    private listTitles: any[];
    private orderHubModel = new Array<OrderHubModel>();


    constructor(location: Location, private element: ElementRef,
        private router: Router, private signalrService: SignalRService,
        private toastr: ToastrService, private jwtService: JwtHelperService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
        this.getUserName();
        this.getOrders();
    }

    openLink() {
        window.open('https://trello.com/b/AHZpGF1G/mingem', '_blank');
    }

    getOrders() {
        this.signalrService.signalReceived.subscribe((signal: OrderHubModel) => {
            this.orderHubModel.push(signal);
            this.toastr.success('You received an order!');
            this.playAudio();
        },
            (error) => {
                // this.toastr.warning('Failed to connect Real Time, Contact the vendor', 'Error');
            });
    }

    playAudio() {
        const audio: HTMLAudioElement = new Audio('../../../../assets/audio/noti.mp3');
        audio.play();
    }

    getUserName() {
        const token = localStorage.getItem('session');
        const payload = this.jwtService.decodeToken(token);
        this.fullname = payload?.unique_name;
        this.role = payload?.role;
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path.includes(titlee)) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
}
