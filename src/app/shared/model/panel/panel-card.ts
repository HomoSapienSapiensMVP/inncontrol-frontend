import {PanelCardIcon} from "./panel-card-icon";

export class PanelCard {
  title: string;
  icon: PanelCardIcon;
  toRoute: string;
  manager: boolean;
  constructor(title: string, icon: PanelCardIcon, toRoute: string, manager: boolean) {
    this.title = title;
    this.icon = icon;
    this.toRoute = toRoute;
    this.manager = manager;
  }
}
