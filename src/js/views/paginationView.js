import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTOPage = +btn.dataset.goto;

      handler(goTOPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page1 and then others
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        `;
    }

    // Other Page
    if (currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
