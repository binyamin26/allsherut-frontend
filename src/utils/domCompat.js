// Correctifs de compatibilité navigateur, à importer AVANT React et Swiper.

// 1) Certains navigateurs/WebViews exposent HTMLSlotElement sans assignedElements(), et Swiper
//    l'appelle à l'initialisation du carrousel ("s.assignedElements is not a function").
try {
  if (typeof HTMLSlotElement !== 'undefined' && !HTMLSlotElement.prototype.assignedElements) {
    HTMLSlotElement.prototype.assignedElements = function assignedElements(options) {
      const nodes = this.assignedNodes ? this.assignedNodes(options) : [];
      return nodes.filter((node) => node.nodeType === 1);
    };
  }
} catch { /* non critique */ }

// 2) La traduction automatique du navigateur (Google Translate, etc.) et certaines extensions
//    remplacent des nœuds du DOM que React croit posséder ; React plante alors avec
//    "removeChild / insertBefore ... not a child of this node" et le visiteur voit la page d'erreur.
//    On ignore ces opérations devenues impossibles au lieu de lever une exception.
try {
  if (typeof Node === 'function' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function removeChild(child) {
      if (child && child.parentNode !== this) return child;
      return originalRemoveChild.call(this, child);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function insertBefore(newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        return originalInsertBefore.call(this, newNode, null);
      }
      return originalInsertBefore.call(this, newNode, referenceNode);
    };
  }
} catch { /* non critique */ }
