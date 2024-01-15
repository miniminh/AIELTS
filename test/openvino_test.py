from openvino.runtime import Core 

core = Core()
compiled_model = core.compile_model(model, "CPU")