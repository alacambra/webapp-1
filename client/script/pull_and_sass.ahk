IniRead, bash_path, pull_and_sass.ini, config, bash_path

if bash_path = ERROR
{
	InputBox, bash_path, %window_title%, Bash Pfad,,, 130
	if bash_path =
	{
	    MsgBox,, %window_title%, Der Pfad ist ungültig!
		ExitApp
		return
	}
	IniWrite, %bash_path%, pull_and_sass.ini, config, bash_path
}

Run, %bash_path%, %A_ScriptDir%,,OutputVarPID
WinWait, ahk_pid %OutputVarPID%
WinActivate

Send, cd ..{ENTER}
Send, clear{ENTER}

Send, git pull{ENTER}

Sleep, 5000

Send, grunt sass:dev{ENTER}

Sleep, 3000

Send, exit{ENTER}