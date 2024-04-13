export function dragStartHandler(ev: DragEvent) {
  console.log('DRAGSTART', { ev });
  ev.dataTransfer!.effectAllowed = 'move';
  ev.dataTransfer!.clearData();
  ev.dataTransfer!.setData('text', (ev.target as HTMLElement)['id']);

  /**====================== SETUP PLACEHOLDER ======================================= */
  /**=== DELAY WHILE THE BROWSER DRAWS A PREVIEW OF THE ELEMENT 4ms ==== */
  const timeId = setTimeout(() => {
    (ev.target as HTMLElement).classList.add('dragged');
    clearTimeout(timeId);
  }, 0);
}

export const dragOverSort = function (this: any, ev: DragEvent) {
  ev.preventDefault();
  ev.dataTransfer!.dropEffect = 'move';

  let currentItemList = Array.from(this.children as HTMLCollection);
  /**==================== ↓↓↓ AVAILABLE INSIDE PARENT CONTAINER ↓↓↓  ============================= */
  let currentDraggableElement = this.querySelector('.dragged');
  /**==================== ↑↑↑ AVAILABLE INSIDE PARENT CONTAINER ↑↑↑  ============================= */

  const currentOverlappedElement = ev.target as Element;

  /**==================== ↓↓↓ BETWEEN CONTAINERS ↓↓↓ ================================== */
  if (null == currentDraggableElement) {
    if (currentOverlappedElement !== this) {
      // when this - is container of items - executed dropHandler()
      currentDraggableElement = document.body.querySelector('.dragged');
      const overlappedItemIndex = currentItemList.findIndex(
        (item: Element) => item.id === currentOverlappedElement!.id
      );

      for (
        let index = overlappedItemIndex;
        index <= this.children.length; // static length before update, to exclude infinity loop
        index++
      ) {
        if (index === overlappedItemIndex) {
          // replace current dragged item with overlapped element
          currentItemList[index] = currentDraggableElement;
        } else {
          // shift the list of elements after the inserted element
          currentItemList[index] = this.children.item(index - 1);
        }
      }
    }
    this.replaceChildren(...currentItemList);
    /**==================== ↑↑↑ BETWEEN CONTAINERS END ↑↑↑ =============================== */
    /**==================== ↓↓↓ INSIDE PARENT CONTAINER ↓↓↓  ============================= */
  } else if (currentOverlappedElement.parentElement === this) {
    const currentDraggableElementIndex = currentItemList.findIndex(
      (item) => item.id === currentDraggableElement.id
    );

    const overlappedElementIndex = currentItemList.findIndex(
      (item) => item.id === currentOverlappedElement.id
    );

    if (
      currentDraggableElementIndex - 1 === overlappedElementIndex ||
      currentDraggableElementIndex + 1 === overlappedElementIndex
    ) {
      /** ========================== REPLACE SIBLINGS =========================================*/
      currentItemList[overlappedElementIndex] = currentDraggableElement;
      currentItemList[currentDraggableElementIndex] = currentOverlappedElement;
      /**============================== MULTILINE DRAGING =========================== */
      /**============================== FROM LEFT TO RIGHT || TOP TO BOTTOM ========== */
    } else if (currentDraggableElementIndex + 1 < overlappedElementIndex) {
      for (
        let index = currentDraggableElementIndex;
        index <= overlappedElementIndex;
        index++
      ) {
        if (index !== overlappedElementIndex) {
          currentItemList[index] = currentItemList[index + 1];
        } else {
          currentItemList[index] = currentDraggableElement;
        }
      }
      /**============================== FROM RIGHT TO LEFT || BOTTOM TO TOP ========== */
    } else {
      for (
        let index = currentDraggableElementIndex;
        index >= overlappedElementIndex;
        index--
      ) {
        if (index !== overlappedElementIndex) {
          currentItemList[index] = currentItemList[index - 1];
        } else {
          currentItemList[index] = currentDraggableElement;
        }
      }
    }

    this.replaceChildren(...currentItemList);
    /**============================= ↑↑↑ INSIDE PARENT CONTAINER END ↑↑↑ =================================== */
  }
};

export function dragEndHandler(this: any, ev: DragEvent) {
  ev.preventDefault();
  this.querySelector('.dragged')?.classList.remove('dragged');
}

export function dropHandler(this: any, ev: DragEvent) {
  ev.preventDefault();

  if (ev.target === this && !!!ev.dataTransfer!.files.length) {
    const data = ev.dataTransfer!.getData('text');
    const draggedElement = document.getElementById(data);

    if (!Array.from(this.children).some((item) => item === draggedElement)) {
      this.appendChild(draggedElement);
      ev.dataTransfer!.clearData();
    }
    draggedElement!.classList.remove('dragged');
  } else if(!!ev.dataTransfer!.files.length) {
    console.log('FILES', {F: ev.dataTransfer!.files});
    const img = document.createElement('img');
    const div = document.createElement('div');
    div.classList.add('drag-item');
    div.setAttribute('draggable', 'true');
    if(this.children.length){
      div.id= `drag-item-${this.children.length}img`;
    } else {
      div.id= `drag-item-0img`;
    }
    const reader = new FileReader();
		reader.onload = function(e: ProgressEvent<FileReader>) {
      
        img.style.width= '100%';
        img.style.objectFit = 'cover';
				img.src=e.target!.result as string;
        div.appendChild(img);
        
		}
		reader.readAsDataURL(ev.dataTransfer!.files.item(0)!);
    const currentItemList = Array.from(this.children);
    currentItemList.push(div);
    this.replaceChildren(...currentItemList);
  }
}
