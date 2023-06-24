
DEFAULT_ROLE_PROMPT = "You are a Math Professor helping students solve math problems"

MARKDOWN_PROMPT = "Please respond with latex syntax for math related equations in the answers"

def get_prompt_for_solution(question):
    return f""" {DEFAULT_ROLE_PROMPT}
    Student needs your help in solving a math problem/equation that student currently stuck on.\
    Student requires a detailed step-by-step solution to guide student through the process. The math problem/equation is as follows:\
    {question}\ Provide a comprehensive step-by-step solution, including formulas, concepts, and techniques, to help me thoroughly understand the problem
    {MARKDOWN_PROMPT}
    """

def get_prompt_for_doubts_of_solution(question):
    return f""" {DEFAULT_ROLE_PROMPT}
    Student needs your help in solving a math problem/equation that student currently stuck on.\
    Student has this doubt :\
    {question}\ Please provide short and beginner friendly answer for the same. Note:{MARKDOWN_PROMPT}"""
