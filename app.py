import gradio as gr

# Define the query processing function
def process_query(history, query, file):
    if file:
        response = f"Processed query: {query}\nProcessed file: {file.name}"  # Placeholder response; integrate your LLM here
        history.append((query, response))
    else:
        response = f"Processed query: {query}"  # Placeholder response; integrate your LLM here
        history.append((query, response))
    return history, "", None

# Define the clear history function
def clear_history():
    return []

# Define the Gradio interface
def frontend():
    with gr.Blocks(css="""
        #input_row {
            display: flex;
            justify-content: flex-start;  /* Align items to the top */
            align-items: flex-start;  /* Align items to the top */
        }
        #file_input {
            flex: 0 0 20%;  /* Takes 20% of the horizontal space */
            margin-left: 8px;
            height: 100%;  /* Extend to full height */
        }
        #query_input {
            flex: 1;  /* Takes the remaining space (80%) */
        }
        #chat_window {
            height: 400px;  /* Adjust height as needed */
        }
        #file_input .wrap {
            min-height: 60px;  /* Minimum height to keep the size consistent */
        }
    """) as demo:
        gr.HTML("<h1 style='text-align: center;'>Law Chatbot</h1>")

        chatbox = gr.Chatbot(elem_id="chat_window")
        
        with gr.Row(elem_id="input_row"):
            query = gr.Textbox(
                label="", 
                placeholder="Enter your query here...", 
                lines=1, 
                elem_id="query_input", 
                interactive=True
            )
            file_input = gr.File(
                label="", 
                file_types=["*"], 
                elem_id="file_input"
            )

        query.submit(process_query, inputs=[chatbox, query, file_input], outputs=[chatbox, query, file_input])
        gr.Button("Clear", elem_id="clear_button").click(clear_history, inputs=[], outputs=[chatbox])

    demo.launch()

if __name__ == "__main__":
    frontend()
