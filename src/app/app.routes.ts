import { Routes } from '@angular/router';
import {SignInComponent} from "./officetech/components/sign-in/sign-in.component";
import {SignUpComponent} from "./officetech/components/sign-up/sign-up.component";
import {SubscriptionComponent} from "./officetech/components/subscription/subscription.component";
import {PaymentDetailsComponent} from "./officetech/components/payment-details/payment-details.component";
import {
  ServicesCompanyComponent
} from "./officetech/components/services-ccompany/services-ccompany.component";
import {CommentsComponent} from "./officetech/components/comments/comments.component";
import {PanelComponent} from "./public/pages/panel-services/panel-services.component";
import {ForumComponent} from "./public/pages/forum/forum.component";
import {HomeComponent} from "./public/pages/home/home.component";
import {ProfileComponent} from "./officetech/components/profile/profile.component";
import {ResponsesComponent} from "./officetech/components/responses/responses.component";
import {PublishComponent} from "./officetech/components/publish/publish.component";
import {ServiceRequestComponent} from "./officetech/components/service-request/service-request.component";
import {EditProfileComponent} from "./officetech/components/edit-profile/edit-profile.component";
import {ServicesRatingComponent} from "./officetech/components/services-rating/services-rating.component";

export const routes: Routes = [
  {
    path: "start",
    component: HomeComponent
  },
  {path: '', pathMatch: 'full', redirectTo: 'start'},
  {
    path: "home",
    component: PanelComponent
  },
  {
    path: "forum",
    component: ForumComponent
  },
  {
    path: "services",
    component: ServicesCompanyComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  { path: "profile/:type_user/:id/edit-profile",
    component: EditProfileComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "forum/responses/:id",
    component: ResponsesComponent
  },
  {
    path: "forum/:type/:id/publish/:idForum",
    component: PublishComponent
  },
  {
    path: "services/new_comment",
    component: CommentsComponent
  },
  {
    path: "services/:type_user/:id/new_tech_requirement",
    component: ServiceRequestComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "sign-up/subscription/:type_user/:id",
    component: SubscriptionComponent
  },
  {
    path: "sign-up/subscription/:type_user/:id/payment-details",
    component: PaymentDetailsComponent
  },
  {
    path: "home/:type_user/:id",
    component: PanelComponent
  },
  {
    path: "forum/:type_user/:id",
    component: ForumComponent
  },
  {
    path: "services/company/:id",
    component: ServicesCompanyComponent
  },
  {
    path: "services/technician/:id",
    component: ServicesRatingComponent
  },
  {
    path: "profile/:type_user/:id",
    component: ProfileComponent
  },
  {
    path: "services/:type_user/:id/new_comment/:serviceId",
    component: CommentsComponent
  },

];
