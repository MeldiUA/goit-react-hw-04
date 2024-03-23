import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ handleLoadMore }) {
  return (
    <button className={css.loadMoreBtn} onClick={handleLoadMore}>
      Load more
    </button>
  );
}
