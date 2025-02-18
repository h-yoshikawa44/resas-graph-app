import { FC, ComponentPropsWithRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PrefectureFieldset from './PrefectureFieldset';
import CheckBox from '@/components/common/CheckBox';
import { prefectures } from '@/mock/data/prefecture';

jest.mock('@/components/common/CheckBox', () => {
  const DummyCheckBox: FC<ComponentPropsWithRef<typeof CheckBox>> = ({
    label,
    isDisabled,
    onChange,
  }) => {
    return (
      <div data-testid="dummyCheckBox">
        <div>{`label: ${label}`}</div>
        <div>{`isDisabled: ${isDisabled}`}</div>
        <input className="dummyOnChange" type="checkbox" onChange={onChange} />
      </div>
    );
  };
  return DummyCheckBox;
});

describe('PrefectureFieldset', () => {
  test('no props contents', () => {
    const handleCheck = jest.fn();
    render(
      <PrefectureFieldset
        isPopulationLoading={false}
        handleCheck={handleCheck}
      />,
    );

    expect(screen.getByTestId('prefectureFieldsetLegend')).toHaveTextContent(
      '都道府県',
    );
  });

  test('props: prefectures undefined', () => {
    const handleCheck = jest.fn();
    render(
      <PrefectureFieldset
        isPopulationLoading={false}
        handleCheck={handleCheck}
      />,
    );

    expect(screen.getByTestId('prefectureFieldsetData').children).toHaveLength(
      0,
    );
  });

  test('props: prefectures', () => {
    const onChange = jest.fn();
    const handleCheck = jest.fn(() => onChange);
    render(
      <PrefectureFieldset
        prefectures={prefectures.result}
        isPopulationLoading={false}
        handleCheck={handleCheck}
      />,
    );

    const dummyCheckBoxList = screen.getAllByTestId('dummyCheckBox');
    expect(dummyCheckBoxList).toHaveLength(47);
  });

  test('hand over props: CheckBox', () => {
    const onChange = jest.fn();
    const handleCheck = jest.fn(() => onChange);
    render(
      <PrefectureFieldset
        prefectures={prefectures.result}
        isPopulationLoading={false}
        handleCheck={handleCheck}
      />,
    );

    // props が子コンポーネントにちゃんと渡っているか確認
    const dummyCheckBox = screen.getAllByTestId('dummyCheckBox');
    expect(
      dummyCheckBox.forEach((d, i) => {
        expect(d).toHaveTextContent(`label: ${prefectures.result[i].prefName}`);
        expect(d).toHaveTextContent(`isDisabled: ${false}`);
        fireEvent.click(d.getElementsByClassName('dummyOnChange')[0]);

        expect(onChange).toHaveBeenCalledTimes(i + 1);
      }),
    );
  });
});
