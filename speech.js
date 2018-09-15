(function init(){
	var utterance
	let synth = window.speechSynthesis
	let form = document.querySelector('form')
	let speechInput = document.querySelector('#speech')
	let voiceSelect = document.querySelector('#voices')
	let pitch = document.querySelector('#pitch')
	let pitchValue = document.querySelector('#pitch-value')
	let rate = document.querySelector('#rate')
	let rateValue = document.querySelector('#rate-value')
	let speakButton = document.querySelector('#speak-button')

	let voices = []

	let getVoices = ()=>{
		if(synth){
			voices = synth.getVoices()

			voices.forEach((voice)=>{
				let option = document.createElement('option')
				option.textContent = `${voice.name} - ${voice.lang}`
				option.setAttribute('data-name',voice.name)
				option.setAttribute('data-lang',voice.lang)
				voiceSelect.appendChild(option)
			})
		}
	}

	getVoices()
	if (speechSynthesis.onvoiceschanged !== undefined) {
		speechSynthesis.onvoiceschanged = getVoices;
	}

	rate.onchange = (e)=>{
		rateValue.textContent =`Rate ${e.target.value}`
		if (utterance) utterance.rate = e.target.value
	}

	pitch.onchange = (e)=>{
		pitchValue.textContent =`Pitch ${e.target.value}`
		if (utterance) utterance.rate = e.target.value

	}
	
	form.onsubmit = (e)=>{
		e.preventDefault()
		if (speechInput.value && speechInput.value.trim()){
			let speech = speechInput.value
			utterance = new SpeechSynthesisUtterance(speech)
			let selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')
			
			voices.forEach((voice)=>{
				if(selectedVoice === voice.name){
					utterance.voice = voice
				}
			})
			
			utterance.lang = voiceSelect.selectedOptions[0].getAttribute('data-lang')
			synth.speak(utterance)
			
		
			
			
		}
	}
})()