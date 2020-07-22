import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import './styles.css';

export default function Paginator(props) {
  const handleBack = () =>
    props.handleMovePaginator(props.currentPage > 0 ? -1 : 0);
  const handleNext = () =>
    props.handleMovePaginator(props.currentPage < props.numPages ? 1 : 0);

  return (
    <MobileStepper
      className='Paginator'
      variant='dots'
      steps={props.numPages}
      position='static'
      activeStep={props.currentPage}
      backButton={
        <Button
          size='small'
          onClick={handleBack}
          disabled={props.currentPage === 0}
          className='ButtonWallaclone ButtonWallaclone__Green'
        >
          <KeyboardArrowLeft />
          Back
        </Button>
      }
      nextButton={
        <Button
          size='small'
          onClick={handleNext}
          disabled={props.currentPage === props.numPages - 1}
          className='ButtonWallaclone ButtonWallaclone__Green'
        >
          Next
          <KeyboardArrowRight />
        </Button>
      }
    />
  );
}
