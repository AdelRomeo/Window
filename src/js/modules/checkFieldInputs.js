const checkFieldInputs = (input, buttonSelector)=>{

  const button = document.querySelector(buttonSelector);

  if (input.value.length < 1){
    button.disabled = true
  } else {
    button.disabled = false
  }
}

export default checkFieldInputs;