package core

func Run(params ...string) {
	if len(params) > 0 && params[0] != "" {
		EngineApp.Run(params[0])
	}
	EngineApp.Run("")
}
