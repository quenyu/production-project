/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
	MutableRefObject,
	ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import styles from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
	className?: string,
	isOpen?: boolean,
	lazy?: boolean,
	onClose?: () => void,
	children?: ReactNode,
}

const ANIMATION_DELAY = 50;

export const Modal = ({
	className,
	children,
	isOpen,
	onClose,
	lazy,
}: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const mods: Mods = {
		[styles.opened]: isOpen,
		[styles.isClosing]: isClosing,
	};
	const [isMounted, setIsMounted] = useState(false);

	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeHandler();
		}
	}, [closeHandler]);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(styles.Modal, mods, [className])}>
				<div className={styles.overlay} onClick={closeHandler}>
					<div className={styles.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
