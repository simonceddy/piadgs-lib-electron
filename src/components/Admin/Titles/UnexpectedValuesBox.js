import { useState } from 'react';
import { FlexCol } from '../../../shared/components/Flex';
import UnexpectedValuesList from './UnexpectedValuesList';
import { DangerButton } from '../../../shared/components/Buttons';

function UnexpectedValuesButton({ setVisible, visible, total }) {
  return (
    <DangerButton
      type="button"
      onClick={() => setVisible(!visible)}
      className="p-1 font-bold active:underline no-underline border rounded w-5/6 mx-auto"
    >
      {visible ? 'Hide' : `View ${total}`} Unexpected Values
    </DangerButton>
  );
}

function UnexpectedValuesBox({ unexpectedValues = [] }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {unexpectedValues.length < 1 ? (<div />) : (
        <FlexCol className="w-full justify-start items-start">
          <UnexpectedValuesButton
            setVisible={setVisible}
            visible={visible}
            total={unexpectedValues.length}
          />
          <UnexpectedValuesList items={unexpectedValues} visible={visible} />
        </FlexCol>
      )}
    </>
  );
}

export default UnexpectedValuesBox;
