import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button =({loadMore})=>{
    return (
        <button type="button" className={css.button} onClick={loadMore}>
            <span className={css.buttonLabel}>Load more</span>
          </button>

    )
}

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}