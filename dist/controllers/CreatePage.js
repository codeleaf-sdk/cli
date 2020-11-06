"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompts_1 = __importDefault(require("prompts"));
var async_fs_wrapper_1 = require("async-fs-wrapper");
var replace_string_1 = __importDefault(require("replace-string"));
var templates_1 = __importDefault(require("../templates"));
var CreatePage = function (_moduleName, _modulePath) { return __awaiter(void 0, void 0, void 0, function () {
    var moduleName, _a, modulePath, _b, injectFetchStore, injectPaginationStore, interpolationMap, fetch_1, pagination, Err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!_moduleName) return [3 /*break*/, 1];
                _a = { moduleName: _moduleName };
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, prompts_1.default({
                    type: 'text',
                    name: 'moduleName',
                    message: 'Enter module name',
                    validate: function (value) { return value.length === 0 || value[0].toUpperCase() !== value[0] ? 'Module name must start from upper case' : true; }
                })];
            case 2:
                _a = _c.sent();
                _c.label = 3;
            case 3:
                moduleName = (_a).moduleName;
                if (!_modulePath) return [3 /*break*/, 4];
                _b = { modulePath: _modulePath };
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, prompts_1.default({
                    type: 'text',
                    name: 'modulePath',
                    message: 'Enter module path',
                })];
            case 5:
                _b = _c.sent();
                _c.label = 6;
            case 6:
                modulePath = (_b).modulePath;
                console.log({ moduleName: moduleName, modulePath: modulePath });
                console.info("\nINFO: store creating now support inject only in-built stores\nINFO: service creating now doesn't support any injects\n  ");
                return [4 /*yield*/, prompts_1.default({
                        type: 'text',
                        name: 'injectFetchStore',
                        message: 'Inject Fetch Store? (y/n)',
                        validate: function (value) { return ['y', 'n'].includes(value.injectFetchStore) ? 'type "y" or "n"!' : true; }
                    })];
            case 7:
                injectFetchStore = (_c.sent()).injectFetchStore;
                return [4 /*yield*/, prompts_1.default({
                        type: 'text',
                        name: 'injectPaginationStore',
                        message: 'Inject Pagination Store? (y/n)',
                        validate: function (value) { return ['y', 'n'].includes(value.injectPaginationStore) ? 'type "y" or "n"!' : true; }
                    })];
            case 8:
                injectPaginationStore = (_c.sent()).injectPaginationStore;
                interpolationMap = {
                    "{$MODULE}": moduleName,
                    "{$STORE-CONSTRUCTOR-DEPS}": '',
                    "{$STORE-IMPORT-DEPS}": '',
                    "{$STORE-DEPS-DEPS}": 'null',
                    // not supported now
                    "{$SERVICE-CONSTRUCTOR-DEPS}": '',
                    "{$SERVICE-IMPORT-DEPS}": '',
                    "{$SERVICE-DEPS-DEPS}": 'null',
                };
                if (injectFetchStore === 'y' || injectPaginationStore === 'y') {
                    fetch_1 = injectFetchStore === 'y' ? "{ ClassName: FetchStore, Args: ['" + moduleName + "FetchStore'] }," : '';
                    pagination = injectPaginationStore === 'y' ? "{ ClassName: PaginationStore, Args: ['" + moduleName + "PaginationStore'] }," : '';
                    interpolationMap['{$STORE-DEPS-DEPS}'] = "[" + fetch_1 + " " + pagination + "],";
                }
                if (injectFetchStore === 'y') {
                    interpolationMap['{$STORE-CONSTRUCTOR-DEPS}'] = 'readonly fetch: FetchStore';
                    interpolationMap['{$STORE-IMPORT-DEPS}'] = ', FetchStore';
                }
                if (injectPaginationStore === 'y') {
                    interpolationMap['{$STORE-CONSTRUCTOR-DEPS}'] = interpolationMap['{$STORE-CONSTRUCTOR-DEPS}'] + ", readonly pagination: PaginationStore";
                    interpolationMap['{$STORE-IMPORT-DEPS}'] = interpolationMap['{$STORE-IMPORT-DEPS}'] + ", PaginationStore";
                }
                console.log('INFO: Writing files');
                _c.label = 9;
            case 9:
                _c.trys.push([9, 11, , 12]);
                return [4 /*yield*/, readTemplates(interpolationMap, modulePath + "/" + moduleName, ['index._ts', 'page._tsx', 'service._ts', 'store._ts'])];
            case 10:
                _c.sent();
                console.log('INFO: Done');
                return [3 /*break*/, 12];
            case 11:
                Err_1 = _c.sent();
                console.error(Err_1.message);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
var readTemplates = function (interpolationMap, modulePath, files) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, async_fs_wrapper_1.mkdir("" + modulePath)];
            case 1:
                _a.sent();
                Promise.all(Object.entries(templates_1.default).map(function (_a) {
                    var fileName = _a[0], contents = _a[1];
                    return __awaiter(void 0, void 0, void 0, function () {
                        var plain;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    plain = "" + contents;
                                    Object.entries(interpolationMap).forEach(function (_a) {
                                        var key = _a[0], value = _a[1];
                                        plain = replace_string_1.default(plain, key, value);
                                    });
                                    return [4 /*yield*/, async_fs_wrapper_1.writeFile(modulePath + "/" + fileName.replace('_', ''), plain)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                }));
                return [2 /*return*/];
        }
    });
}); };
exports.default = CreatePage;
