[{if $oxcmp_categories}]

    [{assign var="oConfig" value=$oViewConf->getConfig()}]
    [{assign var=theme value=$oConfig->getConfigParam('rs-navigationbar_main__theme')}]
    [{assign var=theme value="out/src/css/theme/"|cat:$theme|cat:".scss"}]
    [{oxstyle include=$oViewConf->getModuleUrl("rs-navigationbar", "out/src/css/rs-megamenu.scss")}]
    [{oxstyle include=$oViewConf->getModuleUrl("rs-navigationbar", $theme)}]
    [{oxscript include=$oViewConf->getModuleUrl("rs-navigationbar", "out/src/js/rs-megamenu.js")}]

    [{assign var="homeSelected" value="false"}]
    [{if $oViewConf->getTopActionClassName() == 'start'}]
        [{assign var="homeSelected" value="true"}]
    [{/if}]
    [{assign var="oxcmp_categories" value=$oxcmp_categories}]
    [{assign var="blFullwidth" value=$oViewConf->getViewThemeParam('blFullwidthLayout')}]


    <div id="rs-megamenu-wrapper" class="sticky">
        <span id="rs-megamenu-shadow"></span>
        <span id="rs-megamenu-menu">Menü</span>
        <nav id="rs-megamenu">
            <div id="rs-megamenu-row">
                <span id="rs-megamenu-close"></span>

                [{* home link *}]
                [{if $oConfig->getConfigParam('rs-navigationbar_main__display_homelink')}]
                    <div class="rs-megamenu-item-root">
                        <a class="[{if $homeSelected == 'true'}]selected[{/if}]" href="[{$oViewConf->getHomeLink()}]">[{oxmultilang ident="HOME"}]</a>
                    </div>
                [{/if}]

                [{foreach from=$oxcmp_categories item="ocat" key="catkey" name="root"}]
                    [{if $ocat->getIsVisible()}]

                        [{* make the calculation for this categorie *}]
                        [{$ocat->rs_navigationbar_generateSub($oViewConf, $homeSelected)}]

                        [{* cms *}]
                        [{foreach from=$ocat->getContentCats() item="oTopCont" name="MoreTopCms"}]
                            <div class="rs-megamenu-item-root">
                                <a class="[{if $oContent->oxcontents__oxloadid->value === $oTopCont->oxcontents__oxloadid->value}] selected [{/if}]" href="[{$oTopCont->getLink()}]">[{$oTopCont->oxcontents__oxtitle->value}]</a>
                            </div>
                        [{/foreach}]

                        [{* categorie and sub categorie *}]
                        <div class="rs-megamenu-item-root [{if $ocat->rs_navigationbar_hasSubCount()}]rs-megamenu-item-root-has-sub[{/if}]">
                            [{* categorie *}]
                            <a class="[{if $homeSelected == 'false' && $ocat->expanded}] selected [{/if}]" href="[{$ocat->getLink()}]">
                                [{$ocat->oxcategories__oxtitle->value}]
                            </a>

                            [{* display subcats *}]
                            [{if $ocat->rs_navigationbar_hasSubCount()}]
                                <div class="rs-megamenu-row-sub row">
                                    [{assign var=bDisplaySnippet value=false}]
                                    [{assign var=sSnippetId value=$ocat->getId()}]
                                    [{assign var=sSnippetId value="rs-megamenu-snippet-"|cat:$sSnippetId}]
                                    [{assign var=sSnippetId value=$sSnippetId|md5}]
                                    [{assign var=sSnippet value=""}]
                                    [{if $oConfig->getConfigParam('rs-navigationbar_main__display_snippet_id_in_the_shop')}]
                                        [{assign var=bDisplaySnippet value=true}]
                                    [{/if}]
                                    [{oxifcontent ident=$sSnippetId object="oCont"}]
                                        [{assign var=bDisplaySnippet value=true}]
                                        [{assign var=sSnippet value=$oCont->oxcontents__oxcontent->value}]
                                    [{/oxifcontent}]
                                    <div class="col rs-megamenu-row-sub-categories">
                                        <div class="row">
                                            [{assign var=aSubCatsCols value=$ocat->rs_navigationbar_getSubColumns()}]
                                            [{foreach from=$aSubCatsCols item=aSubCats}]
                                                <div class="rs-megamenu-col-sub col-sm-12 col-md-[{$ocat->rs_navigationbar_columnWidthMedium()}] col-lg-[{$ocat->rs_navigationbar_columnWidthLarge()}]">
                                                    [{foreach from=$aSubCats item=link}]
                                                        [{$link}]
                                                    [{/foreach}]
                                                </div>
                                            [{/foreach}]
                                        </div>
                                    </div>
                                    [{if $bDisplaySnippet}]
                                        <div class="col-sm-2 d-none d-lg-block rs-megamenu-row-sub-snippet">
                                            [{if $oConfig->getConfigParam('rs-navigationbar_main__display_snippet_id_in_the_shop')}]
                                                <div style="font-size:10px; ">CMS-IDENT:<br>[{$sSnippetId}]</div>
                                            [{/if}]
                                            [{$sSnippet}]
                                        </div>
                                    [{/if}]
                                </div>
                            [{/if}]
                        </div>
                    [{/if}]
                [{/foreach}]
            </div>
        </nav>
        <span id="rs-megamenu-next"></span>
        <span id="rs-megamenu-prev"></span>
    </div>
[{/if}]
