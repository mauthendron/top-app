import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';


export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const shouldReduceMotion = useReducedMotion();


	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1 
			}
		},
		hidden: {marginBottom: 0},
	};

	const variantsChildren = {
		visible: {
			opacity: shouldReduceMotion ? 1 : 0,
			height: 29
		},
		hidden: {
			opacity: 0, 
			height: 0
		}
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory === secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const buildFirstLevel = () => {
		return (
			<ul>
				{firstLevelMenu.map(m => (
					<li key={m.route}>
						<Link href={`/${m.route}`}>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory
								})}>
									{m.icon}
									<span >{m.name}</span>
								</div>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<div key={m._id.secondCategory}>
							<div 
							tabIndex={0} 
							onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} 
							className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
							<motion.div
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.div key={p._id} variants={variantsChildren}>
					<Link tabIndex={isOpened ? 0 : -1} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
					})}>
						{p.category}
					</Link>
				</motion.div>
			))
		);
	};

	return (
		<nav className={styles.menu}>
			{buildFirstLevel()}
		</nav>
	);
};