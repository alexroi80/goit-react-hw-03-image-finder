import { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { notificationOptions } from 'components/Notification/Notification';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
static propTypes = {
  onChange: PropTypes.func.isRequired,
};

  state = {
    searchQuery: '',
  };
  handleSearchQuery = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const{searchQuery} =this.state;
    const form = evt.currentTarget;
    if (searchQuery.trim() === '') {
      return toast.warn('Please enter search query', notificationOptions);
    }

    this.props.onChange(searchQuery);
   form.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}
