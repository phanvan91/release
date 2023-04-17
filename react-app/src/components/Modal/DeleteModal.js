import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

function DeleteModal ({isModalOpen, toggleModal, onDelete}) {
  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader></ModalHeader>
        <ModalBody className="text-center">
          <h3>Are you sure?</h3>
          <p>You won&#39;t be able to revert this!</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger text-white" onClick={onDelete}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DeleteModal

DeleteModal.defaultProps = {
  isModalOpen: false,
  toggleModal: () => {},
  onDelete: () => {}
}

DeleteModal.propTypes = {
  isModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  onDelete: PropTypes.func,
}
