import time

class Timing:
    def __init__(self):
        self.human_data = {}
        self.robot_data = {}
        self.human_task = "none"
        self.robot_task = "none"

    def start_task(self, agent, task_name):
        if(agent == "ROBOT"):
            self.robot_data[task_name] = {"start": time.time()}
            self.robot_task = task_name
        else:
            self.human_data[task_name] = {"start": time.time()}
            self.human_task = task_name

    def get_current_task(self,agent):
        if(agent == "ROBOT"):
            return self.robot_task
        return self.human_task


    def end_task(self,agent, task_name):
        if(agent == "ROBOT"):
            self.robot_data[task_name]["end"] = time.time()
            self.robot_task = "none"
        else:
            self.human_data[task_name]["end"] = time.time()
            self.human_task = "none"

    def generate_report(self):
        for key in human_data:
            curr =  human_data[key]
            duration = curr["end"]-  curr["start"]
            curr["duration"] = duration
        for key in robot_data:
            curr =  robot_data[key]
            duration = curr["end"]-  curr["start"]
            curr["duration"] = duration
        return (human_data, robot_data)

