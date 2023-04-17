import { useReducer } from 'react';
import PropTypes from 'prop-types'
import DeleteModal from "components/Modal/DeleteModal"

const Button = ({onDelete, className}) => {
  const [isModalOpen, toggleModal] = useReducer(p => !p, false);
  return (
    <>
      <button
        type="button"
        className={"btn btn-sm btn-danger text-white" + (className ? (' ' + className) : ' mx-2')}
        onClick={toggleModal}
      >
        Delete
      </button>
      <DeleteModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        onDelete={() => {onDelete(); toggleModal()}}
      />
    </>
  );
}

export default Button

Button.defaultProps = {
  onDelete: () => {}
}

Button.propTypes = {
  onDelete: PropTypes.func,
  className: PropTypes.string,
}
