import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { UserStorageService } from 'app/core/storage/storage.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  shieldVersion = '';
  falconVersion = '';

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private storage: UserStorageService,
  ) {
    this.shieldVersion = environment.version;
    this.falconVersion = environment.apiVersion;
  }

  ngOnInit() {
    let script1 = this.renderer.createElement('script');
    script1.text = `window.zEmbed||function(e,t){
        var n,o,d,i,s,a=[],
        r=document.createElement("iframe");
        window.zEmbed=function() {
          a.push(arguments)
        },
        window.zE=window.zE||window.zEmbed,
        r.src="javascript:false",
        r.title="",
        r.role="presentation",
        (r.frameElement||r).style.cssText="display: none",
        d=document.getElementsByTagName("script"),
        d=d[d.length-1],
        d.parentNode.insertBefore(r,d),
        i=r.contentWindow,
        s=i.document;
        try{o=s}catch(c){
          n=document.domain,
          r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',
          o=s
        }
        o.open()._l=function(){
          var o=this.createElement("script");
          n&&(this.domain=n),
          o.id="js-iframe-async",
          o.src=e,this.t=+new Date,
          this.zendeskHost=t,
          this.zEQueue=a,
          this.body.appendChild(o)
        },
        o.write('<body onload="document._l();">'),
        o.close()
      }("https://assets.zendesk.com/embeddable_framework/main.js","amalyze.zendesk.com");
    `;

    let script2 = this.renderer.createElement('script');
    let userInfo = this.storage.get().user;
    script2.text = `
      zE(function() {
        zE.identify({
          name: '` + userInfo.firstname + " " + userInfo.lastname + `',
          email: '` + userInfo.email + `',
          organization: '` + userInfo.entity.company + `'
        });
    
        $zopim(function(){
          $(window).on('hashchange', function(){
            $zopim.livechat.sendVisitorPath();
          });
          $zopim.livechat.addTags("` + userInfo.entity.id + `", "` + userInfo.entity.company + `");
          window.onreplacestate = function(){
            $zopim.livechat.sendVisitorPath();
          }
        });
      });
    `;

    this.renderer.appendChild(this.document.body, script1);
    this.renderer.appendChild(this.document.body, script2);
  }
}
