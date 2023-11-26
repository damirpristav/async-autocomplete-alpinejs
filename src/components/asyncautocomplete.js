import Alpine from 'alpinejs';

document.addEventListener("alpine:init", () => {
  Alpine.data("asyncautocomplete", (url, resultsProp = '') => ({
    open: false,
    url,
    resultsProp,
    results: [],
    search: '',
    isLoading: false,
    totalResults: 0,

    async fetchResults(scrolled = false) {
      this.isLoading = true;
      if (!scrolled) {
        this.$refs.dropdown.scrollTop = 0;
      }
      try {
        let url = `${this.url}/search?q=${this.search}`;
        if (scrolled && this.results.length > 0) {
          url += `&skip=${this.results.length}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        const newResults = resultsProp ? data[`${resultsProp}`] || [] : data || [];
        this.results = scrolled ? [...this.results, ...newResults] : newResults;
        this.totalResults = data.total || 0;
      } catch (error) {
        // handle error here - we will just console log the error for this project
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async onFocus() {
      this.open = true;
      this.fetchResults();
    },
    onScroll(event) {
      const el = event.target;
      if (!el) return;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 1 && this.results.length < this.totalResults) {
        this.fetchResults(true);
      }
    },
    onClear(resetSearchValue = false) {
      this.open = false;
      this.results = [];
      this.isLoading = false;
      if (resetSearchValue) {
        this.search = '';
      }
    },
  }))
});