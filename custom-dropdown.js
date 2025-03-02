const targetElement = document.querySelector(
  '.product__description.rte.quick-add-hidden p'
);
const targetParent = targetElement.parentNode;
const targetElements = targetParent.children;

// Format will be like [['section heading text', <p>, <ul>], ['heading text', <p>]]
const dropdownSections = [['Description']];
let iterator = 0;
let sectionCounter = 0;
do {
  // Check if there's bold text to use as dropdown section heading
  const strongElement = targetElements[iterator].querySelector('strong');
  if (strongElement !== null) {
    sectionCounter++;
    let headingText = strongElement.textContent.trim();
    if (headingText.slice(-1) === ':') {
      headingText = headingText.slice(0, -1);
    }
    dropdownSections[sectionCounter] = [headingText];
    strongElement.remove();
  }
  // Add nodes to section as long as they're not empty
  if (targetElements[iterator].textContent.length > 0) {
    dropdownSections[sectionCounter].push(targetElements[iterator]);
  }

  iterator++;
} while (iterator < targetElements.length);

// Get rid of white space in text leftover from removing <strong> elements
for (let i = 0; i < targetElements.length; i++) {
  targetElements[i].textContent = targetElements[i].textContent.trim();
}

// Create dropdown heading + content for each dropdown section
for (let i = 0; i <= sectionCounter; i++) {
  // Create new node for section heading and wrapper node for content
  const dropdownHeading = document.createElement('div');
  dropdownHeading.classList.add('dropdown-heading');
  dropdownHeading.textContent = dropdownSections[i][0];

  const dropdownContent = document.createElement('div');
  dropdownContent.classList.add(`dropdown-content`);
  if (i > 0) {
    dropdownContent.classList.add('dropdown-content-hidden');
  }

  targetParent.appendChild(dropdownHeading);
  targetParent.appendChild(dropdownContent);

  dropdownHeading.addEventListener('click', (e) =>
    dropdownContent.classList.toggle('dropdown-content-hidden')
  );

  // Add existing nodes to content
  dropdownSections[i].forEach((x, index) => {
    if (index > 0) {
      dropdownContent.appendChild(x);
    }
  });
}
