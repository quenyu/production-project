import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { counterActions } from '../models/slice/counterSlice';
import { getCounterValue } from '../models/selectors/getCounterValue/getCounterValue';

export const Counter = memo(() => {
	const dispatch = useDispatch();
	const counterValue = useSelector(getCounterValue);
	const { t } = useTranslation();

	const increment = () => {
		dispatch(counterActions.increment());
	};

	const decrement = () => {
		dispatch(counterActions.decrement());
	};

	return (
		<div>
			<h1 data-testid="value-title">{counterValue}</h1>
			<Button
				onClick={increment}
				data-testid="increment-btn"
			>
				{t('increment')}
			</Button>
			<Button
				data-testid="decrement-btn"
				onClick={decrement}
			>
				{t('decrement')}
			</Button>
		</div>
	);
});
