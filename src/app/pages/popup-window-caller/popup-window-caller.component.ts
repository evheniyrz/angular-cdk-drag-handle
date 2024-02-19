import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { HostAttachedDirectiveWindowComponent } from 'src/app/components/host-attached-directive/host-attached-directive.component';
import {
  CdkPortalOutlet,
  CdkPortalOutletAttachedRef,
  ComponentPortal,
  PortalModule,
} from '@angular/cdk/portal';

@Component({
  selector: 'app-host-attached-directive',
  standalone: true,
  imports: [HostAttachedDirectiveWindowComponent, PortalModule],
  templateUrl: './popup-window-caller.component.html',
  styleUrl: './popup-window-caller.component.scss',
})
export class PopupWindowCallerComponent implements OnInit {
  @ViewChild(CdkPortalOutlet) cdkPortal!: CdkPortalOutlet;

  componentPortal!: ComponentPortal<HostAttachedDirectiveWindowComponent>;

  recieveReference(ref: CdkPortalOutletAttachedRef): void {
    (
      ref as ComponentRef<HostAttachedDirectiveWindowComponent>
    ).instance.event.subscribe((data: string) => this.cdkPortal.detach());
  }

  attachPopup(): void {
    if (!this.cdkPortal.hasAttached()) {
      this.cdkPortal.attachComponentPortal(this.componentPortal);
    }
  }

  ngOnInit(): void {
    this.componentPortal = new ComponentPortal(
      HostAttachedDirectiveWindowComponent
    );
  }
}
