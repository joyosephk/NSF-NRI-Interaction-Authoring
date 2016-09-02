import sys
import os
import re
def main():
      args = sys.argv
      os.system("./lpg-td-1.0 -o domain.pddl -f pfile -quality -out mysol")
      file = open("mysol.SOL",'r')
      parse(file)
      print("done")
 
def parse(file):
      #takes a file handle, parses the file
      arr = []
      #first, filter out all the non-plan related lines
      for line in file:
              reg = re.search("^\d",line)
              arr.append(reg)
if __name__ == '__main__':
      main()

