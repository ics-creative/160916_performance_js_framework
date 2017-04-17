import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent, ParticleComponent} from "./app.component";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, ParticleComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}