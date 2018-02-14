import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import { CoreModule } from './core/core.module';
import { SmartadminLayoutModule } from './shared/layout/layout.module';
import { LoadingIndicatorModule } from './shared/ui/loading-indicator/loading-indicator.module';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the home entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SmartadminLayoutModule,
        LoadingIndicatorModule,
        routing
    ],
    exports: [],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        // ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})

export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {}
}

