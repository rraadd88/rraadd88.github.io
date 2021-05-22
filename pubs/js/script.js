/*************************************
UTILITIES
*************************************/
// custom event polyfill
(function () {
  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

// create optimized scrolling event
(function () {
  const throttle = function (type, title, obj) {
    obj = obj || window;
    let running = false;
    const func = function () {
      if (running) {return;}
      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(title));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  //init - you can init any event
  throttle('scroll', 'optimizedScroll');
})();

const getScrollXY = () => {
  let scrOfX = 0;
  let scrOfY = 0;
  if (typeof window.pageYOffset === 'number') {
    // Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
    // DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
    // IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [scrOfX, scrOfY];
};

const getDocHeight = () => {
  const D = document;
  return Math.max(
  D.body.scrollHeight, D.documentElement.scrollHeight,
  D.body.offsetHeight, D.documentElement.offsetHeight,
  D.body.clientHeight, D.documentElement.clientHeight);

};

const isScrollBottom = (tolerance = 0) => {
  return getDocHeight() < getScrollXY()[1] + window.innerHeight + tolerance;
};

function shuffle(a) {
  // let b = [...a];
  // for (let i = b.length; i; i--) {
  //   let j = Math.floor(Math.random() * i);
  //   [b[i - 1], b[j]] = [b[j], b[i - 1]];
  // }
  return a;
}

/*************************************
  COMPONENT: FILTERED GRID
  *************************************/
const filteredGrid = {
  props: {
    items: {
      type: Array,
      required: true },

    emptyResult: {
      type: Object,
      required: true },

    query: {
      type: String,
      default: '' },

    filter: {
      type: String,
      default: '' },

    queryBy: {
      type: String,
      default: '' },

    filterBy: {
      type: String,
      default: '' },

    numResults: {
      type: Number,
      default: 6 },

    initNumResults: {
      type: Number,
      default: 6 },

    numCols: {
      type: Number,
      default: 1 },

    infiniteDistance: {
      type: Number,
      default: 600 } },


  computed: {
    results: function () {
      const _results = this.items.filter(i => {
        return (
          (!this.queryBy ||
          i[this.queryBy].toLowerCase().indexOf(this.query.toLowerCase()) !== -1) && (
          !this.filterBy ||
          i[this.filterBy].indexOf(this.filter) !== -1 || this.filter === ''));

      }).slice(0, this.numResults);
      return _results.length > 0 ? _results : this.emptyResult;
    } },

  watch: {
    query: function (val, oldVal) {
      this.numResults = this.initNumResults;
    },
    filter: function (val, oldVal) {
      this.numResults = this.initNumResults;
    } },

  created: function () {
    window.addEventListener('optimizedScroll', () => {
      if (isScrollBottom(this.infiniteDistance) && this.numResults < this.items.length) {
        this.numResults += this.numCols;
      }
    });
  },
  template: `<transition-group
    tag="ul"
    title=""
    class="gsf-filtered-grid">
    <slot v-for="i in results"
      v-bind:data="i"
      v-bind:last="results.indexOf(i) === results.length - 1"
      v-bind:card-width="numCols === 1 ? '100%' : ((100/numCols) - 1.5) + '%'">
    </slot>
  </transition-group>` };


/*************************************
                          COMPONENT: FILTER LIST
                          *************************************/
const filterList = {
  props: {
    activeFilter: {
      type: String,
      default: '' },

    allText: {
      type: String,
      default: 'All' },

    backdrop: {
      type: Boolean,
      default: true },

    drawerOpen: {
      type: Boolean,
      default: false },

    filters: {
      type: Array,
      required: true },

    onChange: {
      type: Function,
      required: true } },


  methods: {
    toggleDrawer: function (bool) {
      this.drawerOpen = bool;
    } },

  watch: {
    activeFilter: function (val, oldVal) {
      this.drawerOpen = false;
    } },

  template: `<div class="gsf-filters" v-bind:class="{'gsf-filters-backdrop': backdrop, 'gsf-mobile-filters-open': drawerOpen}">
    <a v-on:click="toggleDrawer(!drawerOpen)" class="gsf-mobile-filters-drawer">
      <span class="gsf-mobile-filters-heading">Filter</span>
      <span class="gsf-mobile-filters-selected">{{ activeFilter === '' ? allText : activeFilter }}</span>
    </a>
    <div class="gsf-filter-list-wrap">
      <ul class="gsf-filter-list">
        <li><a
          v-bind:class="{'gsf-filter-active': activeFilter === ''}"
          v-on:click="onChange('')"><span>{{allText}}</span></a></li>
        <li v-for="filter in filters"><a
          v-bind:class="{'gsf-filter-active': activeFilter === filter}"
          v-on:click="onChange(filter)"><span>{{filter}}</span></a></li>
      </ul>
    </div>
  </div>` };

/*************************************
             COMPONENT: FRIEND CARD
             *************************************/
const friendCard = {
  props: {
    cardWidth: {
      type: String,
      default: '100%' },

    data: {
      type: Object,
      required: true } },


  template: `
  <li class="gsf-friend-card" v-bind:style="{width: cardWidth}">
    <div class="gsf-friend-img-wrapper">
      <img class="gsf-friend-static" v-bind:src="data.pathlogo" alt="" />
      <img class="gsf-friend-animated" v-bind:src="data.pathfigure" alt="" />
    </div>
    <div class="gsf-friend-card-text-textbox">
      <div class="gsf-friend-full-name">{{ data.title }}</div>
        <div class="gsf-friend-details">
          {{ data.authors }}<br>
          <a v-bind:href="data.linkpdf" target="_blank">{{ data.journal }}🗎</a>
        </div>
      <div class="gsf-friend-job-title">{{ data.year }}</div>
    </div>
  </li>
  ` };


/*************************************
            MAIN
            *************************************/
const whoWeAre = {
  components: {
    'filtered-grid': filteredGrid,
    'filter-list': filterList,
    'friend-card': friendCard },

  props: {
    friends: {
      type: Array,
      required: true },

    tags: {
      type: Array,
      required: true } },


  data: function () {
    return {
      query: '',
      activeTag: '',
      numCols: 2,
      allFriends: shuffle(this.friends),
      noFriends: [{
        id: -1,
        title: 'No results found',
        pathfigure: '',
        pathlogo: ''
        }] };


  },
  watch: {
    activeTag: function (val, oldVal) {
      this.allFriends = shuffle(this.allFriends);
    } },

  methods: {
    setTag: function (tag) {
      this.activeTag = tag;
      this.query = '';
    },
    onKeyDown: function () {
      this.activeTag = '';
    } },

  template: `<div class="friends-gallery">
    <div class="friends-search">
      <div class="friends-input-wrapper">
        <input
          type="text"
          placeholder=""
          v-model="query"
          v-on:keydown="onKeyDown"/>
        <div class="friends-input-status"></div>
      </div>
    </div>
    <div class="friends-main">
      <filter-list
        allText="All"
        v-bind:filters="tags"
        v-bind:active-filter="activeTag"
        v-bind:on-change="setTag" />
      <filtered-grid
        filter-by="tags"
        query-by="title"
        v-bind:items="allFriends"
        v-bind:filter="activeTag"
        v-bind:query="query"
        v-bind:num-cols="numCols"
        v-bind:empty-result="noFriends">
        <template scope="props">
          <friend-card
            v-bind:data="props.data"
            v-bind:key="props.data.id"
            v-bind:card-width="props.cardWidth"/>
        </template>
      </filtered-grid>
    </div>
  </div>` };


/*************************************
             GET DATA AND MOUNT
             *************************************/

// const friendsGallery = document.getElementById('friends-gallery');

const friendsData = [
  {
    "title": "Need for Multi-level Integration (Comment)",
    "doilink": "http://www.cell.com/cell-systems/pdf/S2405-4712(16)00011-9.pdf",
    "isopensource": "",
    "linkpdf": "http://www.cell.com/cell-systems/pdf/S2405-4712(16)00011-9.pdf",
    "journal": "Cell Systems",
    "year": "2016",
    "authors": "R Dandage",
    "pathlogo": "static/schem_62_plot_molecules_plot_protein_plot_cell_plot_human_plot_cells_plot_proteins.png",
    "pathfigure": "static/2016_01.png",
    "tags": ["integrative biology"]
  },
  {
    "title": "Similarities in biological processes can be used to bridge ecology and molecular biology (Review)",
    "doilink": "https://doi.org/10.1111/eva.12961",
    "isopensource": "",
    "linkpdf": "https://onlinelibrary.wiley.com/doi/pdf/10.1111/eva.12961",
    "journal": "Evolutionary Applications",
    "year": "2020",
    "authors": "J Hallin, A F Cisneros, M Hénault, A Fijarczyk, R Dandage, C Bautista, C R Landry*",
    "pathlogo": "static/schem_62_plot_molecules_plot_protein_plot_cell_plot_human_plot_cells_plot_proteins.png",
    "pathfigure": "static/2020_01.png",
    "tags": ["integrative biology"]
  },
  {
    "title": "Paralog dependency indirectly affects the robustness of human cells",
    "doilink": "https://doi.org/10.15252/msb.20198871",
    "isopensource": "TRUE",
    "linkpdf": "https://doi.org/10.15252/msb.20198871",
    "journal": "Molecular Systems Biology",
    "year": "2019",
    "authors": "R Dandage, C R Landry*",
    "pathlogo": "static/schem_55_plot_cell_plot_human_plot_cells_plot_proteins.png",
    "pathfigure": "static/2019_01.png",
    "tags": ["gene duplication"]
  },
  {
    "title": "Differential Strengths Of Molecular Determinants Guide Environment Specific Mutational Fates",
    "doilink": "https://doi.org/10.1371/journal.pgen.1007419",
    "isopensource": "TRUE",
    "linkpdf": "https://doi.org/10.1371/journal.pgen.1007419",
    "journal": "PLOS Genetics",
    "year": "2018",
    "authors": "R Dandage, R Pandey, G Jayaraj, M Rai, D Berger, K Chakraborty*",
    "pathlogo": "static/schem_11_plot_protein_plot_cell.png",
    "pathfigure": "static/2018_01.png",
    "tags": ["mutational scanning"]
  },
  {
    "title": "beditor: A Computational Workflow for Designing Libraries of Guide RNAs for CRISPR-Mediated Base Editing",
    "doilink": "https://doi.org/10.1534/genetics.119.302089",
    "isopensource": "TRUE",
    "linkpdf": "https://doi.org/10.1534/genetics.119.302089",
    "journal": "Genetics",
    "year": "2019",
    "authors": "R Dandage*, P C Despres, N Yachie, C R Landry",
    "pathlogo": "static/schem_11_plot_protein_plot_cell.png",
    "pathfigure": "static/2018_02.png",
    "tags": ["method development", "gene editing"]
  },
  {
    "title": "Frequent assembly of chimeric complexes in the protein interaction network of an interspecies hybrid",
    "doilink": "https://doi.org/10.1101/2020.06.02.130567",
    "isopensource": "TRUE",
    "linkpdf": "https://www.biorxiv.org/content/biorxiv/early/2020/06/04/2020.06.02.130567.full.pdf",
    "journal": "bioRxiv",
    "year": "2020",
    "authors": "R Dandage⁼, C M Berger⁼, I Gagnon-Arsenault, K Moon, R G Stacey, L J Foster, C R Landry*",
    "pathlogo": "static/schem_20_plot_cells_plot_proteins.png",
    "pathfigure": "static/2020_04.png",
    "tags": ["proteomics","*preprints*"]
  },
  {
    "title": "Protein context shapes the specificity of domain-peptide interactions in vivo",
    "doilink": "https://doi.org/10.1101/2020.05.18.103002",
    "isopensource": "TRUE",
    "linkpdf": "https://www.biorxiv.org/content/10.1101/2020.05.18.103002v3.abstract",
    "journal": "bioRxiv",
    "year": "2020",
    "authors": "U Dionne, É Bourgault, A K Dubé, D Bradley, F Chartier, R Dandage, S Dibyachintan, P C Després, G D Gish, J Lambert, N Bisson, C R Landry*",
    "pathlogo": "static/schem_33_plot_protein_plot_cell_plot_proteins.png",
    "pathfigure": "static/2020_03.png",
    "tags": ["mutational scanning","*preprints*"]
  },
  {
    "title": "dms2dfe: Comprehensive Workflow for Analysis of Deep Mutational Scanning Data",
    "doilink": "https://doi.org/10.21105/joss.00362",
    "isopensource": "",
    "linkpdf": "https://doi.org/10.21105/joss.00362",
    "journal": "JOSS",
    "year": "2016",
    "authors": "R Dandage*, K Chakraborty",
    "pathlogo": "static/schem_11_plot_protein_plot_cell.png",
    "pathfigure": "static/2016_02.png",
    "tags": ["method development","mutational scanning"]
  },
  {
    "title": "htsimaging: Single particle tracking to monitor endocytosis in yeast",
    "doilink": "https://doi.org/10.5281/zenodo.3697134",
    "isopensource": "TRUE",
    "linkpdf": "https://zenodo.org/record/3697135",
    "journal": "zenodo",
    "year": "2020",
    "authors": "R Dandage*",
    "pathlogo": "static/schem_02_plot_cell.png",
    "pathfigure": "static/2020_02.png",
    "tags": ["method development"]
  },
  {
    "title": "Classification of chemical chaperones based on their effect on protein folding landscapes",
    "doilink": "http://dx.doi.org/10.1021/cb500798y",
    "isopensource": "",
    "linkpdf": "http://dx.doi.org/10.1021/cb500798y",
    "journal": "ACS chemical biology",
    "year": "2015",
    "authors": "R Dandage⁼, A Bandyopadhyay⁼, G Jayaraj, K Saxena, V Dalal, A Das, K Chakraborty*",
    "pathlogo": "static/schem_06_plot_molecules_plot_protein.png",
    "pathfigure": "static/2015_01.png",
    "tags": ["biophysics"]
  },
  {
    "title": "Distinct metabolic states of a cell guide alternate fates of mutational buffering through altered proteostasis",
    "doilink": "https://doi.org/10.1038/s41467-020-16804-6",
    "isopensource": "TRUE",
    "linkpdf": "https://www.nature.com/articles/s41467-020-16804-6.pdf",
    "journal": "Nature Communications",
    "year": "2020",
    "authors": "K Verma, K Saxena, R Donaka, A Chaphalkar, M K Rai, A Shukla, Z Zaidi, R Dandage, D Shanmugam, K Chakraborty*",
    "pathlogo": "static/2020_05.png",
    "pathfigure": "static/2020_05.png",
    "tags": ["biophysics"]
  }
]

const friendsTags = {
                     "0":"integrative biology",
                     "1":"mutational scanning",
                     "2":"gene editing",
                     "3":"gene duplication",
                     "4":"proteomics",
                     "5":"biophysics",
                     "6":"method development",
                     "7":"*preprints*"
                    }

new Vue({
  el: '#friends-gallery',
  render: function (createElement) {
    return createElement(whoWeAre, {
      props: {
        friends: friendsData.
        map((e, i) => {
          return {
            id: i,
            title: e.title,
            year: e.year,
            tags: e.tags,
            pathfigure: e.pathfigure,
            pathlogo: e.pathlogo,
            doilink: e.doilink,
            isopensource: e.isopensource,
            linkpdf: e.linkpdf,
            journal: e.journal,
            authors: e.authors,
            jobTitle: e.jobTitle,
            journalname: e.journalname,
            access: e.access,
          };
        }),
        tags: friendsTags } });
  }
  })