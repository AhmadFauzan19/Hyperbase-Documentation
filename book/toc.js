// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="01_introduction/01_chapter.html">Introduction</a></li><li class="chapter-item expanded "><a href="02_quick_start/01_chapter.html"><strong aria-hidden="true">1.</strong> Quick Start (using Hyperbase UI)</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="02_quick_start/02_sign_up.html"><strong aria-hidden="true">1.1.</strong> Sign Up</a></li><li class="chapter-item expanded "><a href="02_quick_start/03_sign_in.html"><strong aria-hidden="true">1.2.</strong> Sign In</a></li><li class="chapter-item expanded "><a href="02_quick_start/04_create_project.html"><strong aria-hidden="true">1.3.</strong> Create Project</a></li><li class="chapter-item expanded "><a href="02_quick_start/05_create_collection.html"><strong aria-hidden="true">1.4.</strong> Create Collection</a></li><li class="chapter-item expanded "><a href="02_quick_start/06_create_bucket.html"><strong aria-hidden="true">1.5.</strong> Create Bucket</a></li><li class="chapter-item expanded "><a href="02_quick_start/07_create_access_token.html"><strong aria-hidden="true">1.6.</strong> Create Access Token</a></li><li class="chapter-item expanded "><a href="02_quick_start/08_api.html"><strong aria-hidden="true">1.7.</strong> API</a></li></ol></li><li class="chapter-item expanded "><a href="03_installation/01_chapter.html"><strong aria-hidden="true">2.</strong> Installation</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="03_installation/02_precompiled_binaries.html"><strong aria-hidden="true">2.1.</strong> Pre-compiled Binaries</a></li><li class="chapter-item expanded "><a href="03_installation/03_build_from_source.html"><strong aria-hidden="true">2.2.</strong> Build From Source</a></li><li class="chapter-item expanded "><a href="03_installation/04_setup/01_chapter.html"><strong aria-hidden="true">2.3.</strong> Setup</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="03_installation/04_setup/02_mqtt.html"><strong aria-hidden="true">2.3.1.</strong> MQTT</a></li><li class="chapter-item expanded "><a href="03_installation/04_setup/03_database_backend.html"><strong aria-hidden="true">2.3.2.</strong> Database Backend</a></li><li class="chapter-item expanded "><a href="03_installation/04_setup/04_hyperbase.html"><strong aria-hidden="true">2.3.3.</strong> Hyperbase</a></li><li class="chapter-item expanded "><a href="03_installation/04_setup/05_hyperbase_ui.html"><strong aria-hidden="true">2.3.4.</strong> Hyperbase UI (Optional)</a></li><li class="chapter-item expanded "><a href="03_installation/04_setup/06_using_docker_compose.html"><strong aria-hidden="true">2.3.5.</strong> Using Docker Compose</a></li></ol></li><li class="chapter-item expanded "><a href="03_installation/05_post_installation.html"><strong aria-hidden="true">2.4.</strong> Post-installation</a></li></ol></li><li class="chapter-item expanded "><a href="04_features/01_chapter.html"><strong aria-hidden="true">3.</strong> Features</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="04_features/02_api.html"><strong aria-hidden="true">3.1.</strong> API</a></li><li class="chapter-item expanded "><a href="04_features/03_project.html"><strong aria-hidden="true">3.2.</strong> Project</a></li><li class="chapter-item expanded "><a href="04_features/04_collection.html"><strong aria-hidden="true">3.3.</strong> Collection</a></li><li class="chapter-item expanded "><a href="04_features/05_collection_schema.html"><strong aria-hidden="true">3.4.</strong> Collection Schema</a></li><li class="chapter-item expanded "><a href="04_features/06_record.html"><strong aria-hidden="true">3.5.</strong> Record</a></li><li class="chapter-item expanded "><a href="04_features/07_bucket.html"><strong aria-hidden="true">3.6.</strong> Bucket</a></li><li class="chapter-item expanded "><a href="04_features/08_file.html"><strong aria-hidden="true">3.7.</strong> File</a></li><li class="chapter-item expanded "><a href="04_features/09_token.html"><strong aria-hidden="true">3.8.</strong> Token</a></li><li class="chapter-item expanded "><a href="04_features/10_token_rules.html"><strong aria-hidden="true">3.9.</strong> Token Rules</a></li><li class="chapter-item expanded "><a href="04_features/11_mqtt_log.html"><strong aria-hidden="true">3.10.</strong> MQTT Logging</a></li><li class="chapter-item expanded "><a href="04_features/12_change_server.html"><strong aria-hidden="true">3.11.</strong> Change Server</a></li><li class="chapter-item expanded "><a href="04_features/13_remove_an_account.html"><strong aria-hidden="true">3.12.</strong> Remove an Account</a></li><li class="chapter-item expanded "><a href="04_features/14_query.html"><strong aria-hidden="true">3.13.</strong> Query</a></li><li class="chapter-item expanded "><a href="04_features/15_query_sql.html"><strong aria-hidden="true">3.14.</strong> Query SQL</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
