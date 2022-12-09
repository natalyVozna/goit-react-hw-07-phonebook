import PropTypes from 'prop-types';
import {
  Item,
  Info,
  DeleteButton,
  Cover,
  InfoBox,
  Text,
} from './ContactItem.styled';

export const ContactItem = ({ name, number, onClickDelete, id, color }) => {
  return (
    <Item>
      <Cover style={{ backgroundColor: color }} />
      <InfoBox>
        <Info>{name}</Info>
        <Text>{number}</Text>
      </InfoBox>
      <DeleteButton type="button" onClick={() => onClickDelete(id)}>
        delete
      </DeleteButton>
    </Item>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClickDelete: PropTypes.func.isRequired,
};
