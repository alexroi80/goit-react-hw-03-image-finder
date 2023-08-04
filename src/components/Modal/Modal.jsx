import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
   static propTypes = {
    largeImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
      };

  componentDidMount (){
window.addEventListener('keydown', this.handleKeydown);
document.body.style.overflow = 'hidden';
  }
  
  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = 'auto';
  }
  
  handleKeydown =(evt)=>{
    if(evt.code === 'Escape'){
        this.props.onClose();
            }
  }

handleBackdropClick =(evt) =>{
    if(evt.currentTarget === evt.target){
        this.props.onClose();
    }
}

    render(){
        const {largeImage, id}=this.props;
    return createPortal(
        <div className={css.overlay} onClick={this.handleBackdropClick}>
          <div className={css.modal}>
            <img src={largeImage} alt={id} className={css.image}/>
          </div>
        </div>,
        modalRoot
      );
  }
    
};
