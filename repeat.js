// Additional JavaScript for handling message repeat functionality
function handleRepeat() {
    if (currentQuestion) {
        input.value = currentQuestion;
        handleSend();
    }
}
