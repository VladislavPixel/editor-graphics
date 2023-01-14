import type { ModalTypes, IModal } from "../interface";

class Modal implements IModal {
	currentTypeModal: ModalTypes;

	title: string;

	offer: string;

	constructor() {
		this.currentTypeModal = "action-undefined";
		this.title = "Модальное окно для обработки действий.";
		this.offer = "В этом окне обычно завершаются все пользовательские действия в редакторе.";
	};

	changeTypeModal(newType: ModalTypes): void {
		switch (newType) {
			case "action-undefined":
				this.title = "Модальное окно для обработки действий.";
				this.offer = "В этом окне обычно завершаются все пользовательские действия в редакторе.";
				break;
			case "action-size-canvas":
				this.title = "Установите новые размеры полотна для рисования.";
				this.offer = "Задавать ширину и высоту нужно в пикселях, исходите из этого расчета. Дефолтные размеры установлены в значениях: ширина - 800px, высота - 300px. Значения ширины и высоты применяются ко всем слоям. В инпуты указывайте только числа. Если вы не зададите какое-то значение или зададите, но некорректно, оно возьмется из дефолта.";
				break;
			case "action-file-save":
				this.title = "Вы в процессе сохранения файла.";
				this.offer = "Вам остается только подтвердить сохранение файла.";
				break;
			case "action-clean-canvas":
				this.title = "Очистка <canvas>";
				this.offer = "Вы можете указать очистить все слои или только конкретный. При очисте всех Вы получите белые полотна. Если конкретный, то будет очищен текущий выбранный слой: в панели /Слои/ у текущего рамка будет подсвечена голубым цветом. В инпуте нужно указать только порядковый номер слоя.";
				break;
			default:
				throw new Error("New Type value is not valid.");
		}

		this.currentTypeModal = newType;
	};
};

export { Modal };
