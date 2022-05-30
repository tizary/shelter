export function addSkeleton(startIndex, endIndex, block) {
  for(let i = startIndex; i < endIndex; i++) {
    const itemSkeleton = document.createElement('div')
    itemSkeleton.classList.add('skeleton')
    itemSkeleton.classList.add('friends-item')
    block.appendChild(itemSkeleton)
  }
}