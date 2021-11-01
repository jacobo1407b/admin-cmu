import { Modal } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal as MC, globalState } from 'types';
import * as patch from 'redux/dispatch'

const ModalCustom = () => {
    const dispatch = useDispatch();
    const modal: MC = useSelector((state: globalState) => state.modal);

    function onClose() {
        dispatch(patch.setModal({
            title: "",
            open: false,
            content: null
        }))
    }
    return (
        <Modal
            size='tiny'
            open={modal.open}
            onClose={() => onClose}
        >
            <Modal.Header>{modal.title}</Modal.Header>
            <Modal.Content>
                {modal.content}
            </Modal.Content>
        </Modal>
    )
}

export default ModalCustom
