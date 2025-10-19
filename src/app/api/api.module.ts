/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ProfileControllerService } from './services/profile-controller.service';
import { OrganizationControllerService } from './services/organization-controller.service';
import { JobPostControllerService } from './services/job-post-controller.service';
import { WorkflowControllerService } from './services/workflow-controller.service';
import { NotificationControllerService } from './services/notification-controller.service';
import { RegistrationControllerService } from './services/registration-controller.service';
import { JobApplicationControllerService } from './services/job-application-controller.service';
import { InvitationControllerService } from './services/invitation-controller.service';
import { AuthenticationControllerService } from './services/authentication-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ProfileControllerService,
    OrganizationControllerService,
    JobPostControllerService,
    WorkflowControllerService,
    NotificationControllerService,
    RegistrationControllerService,
    JobApplicationControllerService,
    InvitationControllerService,
    AuthenticationControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
