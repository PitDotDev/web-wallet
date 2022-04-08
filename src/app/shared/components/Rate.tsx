import React from 'react';
import { styled } from '@linaria/react';

import { fromGroths, getSign, toUSD } from '@core/utils';
import { useSelector } from 'react-redux';
import { selectRate } from '@app/containers/Wallet/store/selectors';

interface Props {
  value: number;
  income?: boolean;
  groths?: boolean;
  className?: string;
}

const Ratetyled = styled.div`
  margin-top: 4px;
  color: rgba(0,0,0, 0.5);
  font-size:14px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
`;

const Rate: React.FC<Props> = ({
  value, income, groths, className,
}) => {
  const rate = useSelector(selectRate());
  const sign = income ? getSign(income) : '';
  const amount = groths ? fromGroths(value) : value;
  return (
    <Ratetyled className={className}>
      {sign}
      {toUSD(amount, rate)}
    </Ratetyled>
  );
};

export default Rate;
