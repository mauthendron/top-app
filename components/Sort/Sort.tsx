/* eslint-disable jsx-a11y/role-supports-aria-props */
import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';
import cn from 'classnames';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName}>Сортировка</div>
			<button
				id='rating'
				onClick={() => setSort(SortEnum.Rating)}
				tabIndex={0}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby='sort rating'
			>
				<SortIcon className={styles.sortIcon} />По рейтингу
			</button>
			<button
				id='price'
				onClick={() => setSort(SortEnum.Price)}
				tabIndex={0}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby='sort price'
			>
				<SortIcon className={styles.sortIcon} />По цене
			</button>
		</div>
	);
};