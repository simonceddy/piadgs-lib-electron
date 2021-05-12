// import styled from 'styled-components';
import {
  BiSearch as Search,
  IoCreate as Create,
  FcDocument as List,
  FcDocument as Delete,
} from 'react-icons/all';
// import { getColourMap } from '../themes';

export function DefaultIcon({ Icon, size = 40 }) {
  return (
    <Icon size={size} />
  );
}

export const SearchIcon = ({ size }) => <DefaultIcon size={size} Icon={Search} />;
export const CreateIcon = ({ size }) => <DefaultIcon size={size} Icon={Create} />;
export const ListIcon = ({ size }) => <DefaultIcon size={size} Icon={List} />;
export const DeleteIcon = ({ size }) => <DefaultIcon size={size} Icon={Delete} />;
