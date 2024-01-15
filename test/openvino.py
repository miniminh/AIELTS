import openvino as ov

core = ov.Core()
compiled_model = core.compile_model(model, "CPU")