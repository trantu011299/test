// ================================ || IMPORT || ================================
// ================================ || IMPORT || ================================
import { compareDate } from 'utils/validations'
import moment from 'moment';
// ================================ || FUNCTION || ================================
/**
 * @param {string} name: Name của field cần tìm
 * @param {Array} content: pFormDef.content
 * @returns index của field trong content, -1 nếu không tìm thấy
 *
 * Hàm này sẽ trả ra index của field trong content, dùng khi cần dùng ref để thực hiện xử lý trong các
 * sự kiện (onFieldsChange, onValuesChange,...)
 */
const findContentIndexByName = (name, content) => {
    let _index = -1;
    content.find((item, index) => {
        if (item.name === name && item.isDivider === false) {
            _index = index;
            return true;
        }
        return false;
    });
    return _index;
};

// ================================ || VALIDATE FUNCTION || ================================

const validateAUTOID = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            // ---------------------------- MANDATORY  ----------------------------
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.reject(new Error('Không được để trống trường này!'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

const validateBANKCODE = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            // ---------------------------- MANDATORY  ----------------------------
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.reject(new Error('Không được để trống trường này!'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

const validateTTYPOFACCT = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            // ---------------------------- MANDATORY  ----------------------------
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.reject(new Error('Không được để trống trường này!'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

const validateGLACCOUNT = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            // ---------------------------- MANDATORY  ----------------------------
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.reject(new Error('Không được để trống trường này!'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

const validateBANKACCTNO = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            // ---------------------------- MANDATORY  ----------------------------
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.reject(new Error('Không được để trống trường này!'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

const validateACNAME = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            // ---------------------------- MANDATORY  ----------------------------
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.reject(new Error('Không được để trống trường này!'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

const validateFRDATE = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            let toDate = moment(getFieldValue('TODATE')).format('DD/MM/YYYY');
            let toDay = moment(value).format('DD/MM/YYYY');
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.reject(new Error('Không được để trống trường này!'));
            }
            // ---------------------------- MANDATORY  ----------------------------
            if (getFieldValue('TODATE') && toDate && !compareDate(toDay, toDate, 'DD/MM/YYYY', '<=')) {
                return Promise.reject(new Error('Hiệu lực từ phải nhỏ hơn hoặc bằng Hiệu lực đến'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

const validateTODATE = ({ getFieldValue }) => ({
    validator(_, value) {
        try {
            let frDate = moment(getFieldValue('FROMDATE')).format('DD/MM/YYYY');
            let toDay = moment(value).format('DD/MM/YYYY');
            if (!value || value.toString().replace(/ /g, '') === '') {
                return Promise.resolve();
            }
            // ---------------------------- MANDATORY  ----------------------------
            if (getFieldValue('FROMDATE') && frDate && !compareDate(toDay, frDate, 'DD/MM/YYYY', '>=')) {
                return Promise.reject(new Error('Hiệu lực đến phải lớn hơn hoặc bằng Hiệu lực từ'));
            }
        } catch (err) {
            return Promise.reject(new Error(`${err}`));
        }

        return Promise.resolve();
    }
});

// ================================ || VALIDATE FUNCTION || ================================

// ================================ || FUNCTION || ================================

// ================================ || COLUMN DEFINE || ================================
// Định nghĩa các cột của grid, tham khảo các thuộc tính khác tại https://www.ag-grid.com/react-data-grid/column-properties/

const columns = [
    {
        field: 'BANKCODE',
        headerName: 'Ngân hàng',
        type: 'text',
        floatingFilter: true,
        floatingFilterComponent: 'textFloatingFilter',
        floatingFilterComponentParams: {}
    },

    {
        field: 'TYPOFACCT',
        headerName: 'Loại Tài khoản',
        type: 'text',
        valueGetter: (params) => {
            return params.data.TYPOFACCT_LB;
        },
        floatingFilter: true,
        floatingFilterComponent: 'comboboxFloatingFilter',
        floatingFilterComponentParams: {
            url: '/search/get_data_combobox',
            requestBody: { SEARCHCODE: 'BANKACCT', FIELDCODE: 'TYPOFACCT' },
            valueProps: 'VALUE',
            labelProps: 'LABEL'
        }
    },

    {
        field: 'BANKACCTNO',
        headerName: 'Số TK Ngân hàng',
        type: 'text',
        floatingFilter: true,
        floatingFilterComponent: 'textFloatingFilter',
        floatingFilterComponentParams: {}
    },

    {
        field: 'ACNAME',
        headerName: 'Tên TK Ngân hàng',
        type: 'text',
        floatingFilter: true,
        floatingFilterComponent: 'textFloatingFilter',
        floatingFilterComponentParams: {}
    },

    // ---------------------------- || Hiệu lực từ || ----------------------------
    {
        field: 'FROMDATE',
        headerName: 'Hiệu lực từ',
        type: 'date',

        width: 200,
        floatingFilter: true,
        floatingFilterComponent: 'dateTimeFloatingFilter',
        floatingFilterComponentParams: { type: 'date', format: 'DD/MM/YYYY' }
    },

    // ---------------------------- || Hiệu lực đến || ----------------------------
    {
        field: 'TODATE',
        headerName: 'Hiệu lực đến',
        type: 'date',

        width: 200,
        floatingFilter: true,
        floatingFilterComponent: 'dateTimeFloatingFilter',
        floatingFilterComponentParams: { type: 'date', format: 'DD/MM/YYYY' }
    },

    // {
    //     field: 'OWNERCD',
    //     headerName: 'Tài khoản của MBF?',
    //     type: 'text',
    //     valueGetter: (params) => {
    //         return params.data.OWNERCD_LB;
    //     },
    //     floatingFilter: true,
    //     floatingFilterComponent: 'comboboxFloatingFilter',
    //     floatingFilterComponentParams: {
    //         url: '/search/get_data_combobox',
    //         requestBody: { SEARCHCODE: 'BANKACCT', FIELDCODE: 'OWNERCD' },
    //         valueProps: 'VALUE',
    //         labelProps: 'LABEL'
    //     }
    // },

    {
        field: 'NOTES',
        headerName: 'Ghi chú',
        type: 'text',
        floatingFilter: true,
        floatingFilterComponent: 'textFloatingFilter',
        floatingFilterComponentParams: {}
    },
    {
        field: 'STATUS',
        headerName: 'Trạng thái xử lý',
        type: 'text',
        valueGetter: (params) => {
            return params.data.STATUS_LB;
        },
        width: 165,
        floatingFilter: true,
        floatingFilterComponent: 'comboboxFloatingFilter',
        floatingFilterComponentParams: {
            url: '/search/get_data_combobox',
            requestBody: { SEARCHCODE: 'CATALOG', FIELDCODE: 'STATUS' },
            valueProps: 'VALUE',
            labelProps: 'LABEL'
        }
    }
];
// ================================ || COLUMN DEFINE || ================================

const defaultColDef = { editable: false, sortable: true };

const pGridOptions = { rowSelection: 'multiple', paginationPageSize: 100 };

const pStyleOptions = { width: '70vw', height: '400px' };

// ================================ || API DEFINE || ================================
// Định nghĩa các api sẽ gọi ứng với các sự kiện của grid(search, add, edit, delete, submit, approve, reject)

const pApi = {
    search: { url: '/grid/fetch_data', body: { searchcode: 'BANKACCT', funckey: '' } },
    add: { url: '/grid/handle_add', body: { funckey: 'mt_bankacct' } },
    edit: { url: '/grid/handle_update', body: { funckey: 'mt_bankacct' } },
    delete: { url: '/grid/handle_delete', body: { funckey: 'mt_bankacct' } },
    submit: { url: '/search/handle_submit', body: { funckey: 'mt_bankacct' } },
    approve: { url: '/grid/handle_approve', body: { funckey: 'mt_bankacct' } },
    reject: { url: '/grid/handle_reject', body: { funckey: 'mt_bankacct' } },
    defaultBody: { tlid: '', role: '', brid: '', objname: 'BANKACCT', language: 'vie' },
    metadata: {}
};
// ================================ || API DEFINE || ================================

// ================================ || ACTION DEFINE || ================================
// Định nghĩa ẩn hiện các action trên actionPanel/ cột Thao tác của grid
const pActionDefs = {
    defaultDef: { mode: 'online', type: 'popup' },
    add: { visible: true, enable: true, batch: false, inlineVisible: true },
    edit: { visible: true, enable: true, batch: false, inlineVisible: true },
    delete: { visible: true, enable: true, batch: false, inlineVisible: true },
    approve: { visible: true, enable: true, batch: false, inlineVisible: false },
    reject: { visible: true, enable: true, batch: false, inlineVisible: false },
    view: { visible: false, enable: true, batch: false, inlineVisible: true },
    export: { visible: true, enable: true, batch: false, inlineVisible: false },
    rules: {
        // Ứng với mỗi mỗi thuộc tính sẽ là 1 hàm để thực hiện enabled/disabled action tương ứng trên cột Thao tác
        // Nếu hàm return true, ===> enable nút đó, nếu hàm return false, ===> disable nút đó. Nếu không cấu hình thì sẽ mặc nhiên là enable
        // Hàm này chỉ có 1 tham số duy nhất data, là dữ liệu của 1 dòng trên grid
    },
    options: {
        // quyết định xem có hiển thị cột action hay không
        inlineVisible: true,
        // cấu hình thứ tự xuất hiện của các action (theo key của actionDefs)
        order: ['add', 'edit', 'delete', 'approve', 'reject', 'view', 'export']
    },
    custom: [],
    event: {
        /**
         * Hàm xử lí convert dữ liệu (hiện đang hỗ trợ cho sự kiện add và edit)
         * @param {Object} data: dữ liệu truyền vào, action: edit|| add
         * @returns
         */
        onConvertData: ({ data, action }) => {
            let dateObj = pPopupFormDef.content.filter((el) => el.type?.toLowerCase() === 'date');
            if (dateObj && dateObj.length > 0) {
                dateObj.map((e) => {
                    try {
                        data[e.name] = data[e.name].format(e.pParams.format);
                        console.log(e);
                    } catch (err) {}
                });
            }
            return data;
        }
    }
};
// ================================ || ACTION DEFINE || ================================

// ================================ || POPUP DEFINE || ================================
// Định nghĩa popup của grid. Phục vụ type: popup, hỗ trợ các sự kiện : add, edit, delete.

const pPopupFormDef = {
    card: null,
    // render: (params, refs) => {} // Dùng trong trường hợp muốn custom popup form
    tabs: [],
    layout: { column: 1, labelAlign: 'right', labelCol: { span: 6 }, wrapperCol: { span: 18 }, gutter: [16, 0], enableFooter: false },
    style: { width: '40vw', height: '40vh', widthMargin: '50px', heightMargin: '0px' },
    event: {
        onFieldsChange: async ({ changedFields, allFields, form, ref, setCoverLoading }) => {
            // Hàm xử lý khi các fields có sự thay đổi
            // form : Form instance
            // ref : FormRef instance
            // setCoverLoading : Hàm để set cover loading
        },
        onValuesChange: async ({ changedValues, allValues, form, ref, setCoverLoading }) => {
            // Hàm xử lý khi các values có sự thay đổi
            // form : Form instance
            // ref : FormRef instance
            // setCoverLoading : Hàm để set cover loading
            // if (changedValues.MBCODE) {
            //     const index = findContentIndexByName('BANKCD', pFormDef.content);
            //     if (index > -1) {
            //     // Gọi ref để xử lý sự kiện thông qua ref.current[index]
            //     }
            // }
            if (Object.keys(changedValues)[0] === 'FROMDATE') {
                form.validateFields(['TODATE']);
                form.validateFields(['FROMDATE']);
            }
            if (Object.keys(changedValues)[0] === 'TODATE') {
                form.validateFields(['TODATE']);
                form.validateFields(['FROMDATE']);
            }
        },
        onFinishFailed: async ({ values, errorFields, errorInfo, form, ref, toast, setCoverLoading }) => {
            // Hàm xử lý khi form submit thất bại
            // values : Giá trị của các fields
            // errorFields : Mảng các field bị lỗi
            // errorInfo : Thông tin lỗi
            // form : Form instance
            // ref : FormRef instance
            // setCoverLoading : Hàm để set cover loading

            toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại thông tin!');
        },
        onFinish: async ({ values, form, ref, toast, setCoverLoading }) => {
            // Hàm xử lý khi form submit
            // values : Giá trị của các fields
            // form : Form instance
            // ref : FormRef instance
            // toast : Toast instance
            // setCoverLoading : Hàm để set cover loading

            // Show loading cover
            setCoverLoading(true);

            // Gọi api thực thi
            // await ....
            //console.log('Received values of form: ', values);

            // Kiểm tra điều kiện và trả về thông báo
            // if (error) {
            //     toast.error("Đã có lỗi xảy ra!");
            // } else {
            //     form.resetFields();
            //     toast.success('Thành công!');
            // }

            // Tắt loading cover
            setCoverLoading(false);
        },
        onLoad: async ({ form, data, editorRef }) => {
            // Hàm xử lý khi load form lên
            // form : Form instance
            // data : Dữ liệu cần load lên form

            form.setFieldsValue({ ...data });
        }
    },
    content: [
        // ------------------- || Số hiệu || -------------------
        {
            name: 'AUTOID',
            label: 'Số hiệu',
            required: false,
            dependOn: [],
            rules: [],
            type: 'number',
            readOnly: { edit: false, add: false },
            metadata: { fldname: 'AUTOID', defname: 'Số hiệu', defval: null, searchcode: 'BANKACCT' },
            pParams: { style: { width: '100%' } },
            isHidden: true,
            pItemParams: {}
        },

        // ------------------- || Ngân hàng || -------------------
        {
            name: 'BANKCODE',
            label: 'Ngân hàng',
            required: true,
            dependOn: [],
            rules: [validateBANKCODE],
            type: 'input',
            readOnly: { edit: true, add: true },
            metadata: { fldname: 'BANKCODE', defname: 'Ngân hàng', defval: null, searchcode: 'BANKACCT' },
            pParams: {},
            isHidden: false,
            pItemParams: {}
        },

        // ------------------- || Loại Tài khoản || -------------------
        {
            name: 'TYPOFACCT',
            label: 'Loại Tài khoản',
            required: true,
            dependOn: [],
            rules: [validateTTYPOFACCT],
            type: 'combobox',
            readOnly: { edit: true, add: false },
            metadata: {
                fldname: 'TYPOFACCT',
                defname: 'Loại Tài khoản',
                defval: null,
                searchcode: 'BANKACCT',
                url: '/search/get_data_combobox',
                requestBody: { SEARCHCODE: 'BANKACCT', FIELDCODE: 'TYPOFACCT' },
                valueProps: 'VALUE',
                labelProps: 'LABEL',
                disabledProps: ''
            },
            pParams: { allowClear: false },
            isHidden: false,
            pItemParams: {}
        },

        // ------------------- || Số TK Kế toán || -------------------
        {
            name: 'GLACCOUNT',
            label: 'Số TK Kế toán',
            required: false,
            dependOn: [],
            rules: [],
            type: 'input',
            readOnly: { edit: true, add: true },
            metadata: { fldname: 'GLACCOUNT', defname: 'Số TK Kế toán', defval: null, searchcode: 'BANKACCT' },
            pParams: {},
            isHidden: true,
            pItemParams: {}
        },

        // ------------------- || Số TK Ngân hàng || -------------------
        {
            name: 'BANKACCTNO',
            label: 'Số TK Ngân hàng',
            required: true,
            dependOn: [],
            rules: [validateBANKACCTNO],
            type: 'input',
            readOnly: { edit: true, add: false },
            metadata: { fldname: 'BANKACCTNO', defname: 'Số TK Ngân hàng', defval: null, searchcode: 'BANKACCT' },
            pParams: {},
            isHidden: false,
            pItemParams: {}
        },

        // ------------------- || Tên TK Ngân hàng || -------------------
        {
            name: 'ACNAME',
            label: 'Tên TK Ngân hàng',
            required: true,
            dependOn: [],
            rules: [validateACNAME],
            type: 'input',
            readOnly: { edit: false, add: false },
            metadata: { fldname: 'ACNAME', defname: 'Tên TK Ngân hàng', defval: null, searchcode: 'BANKACCT' },
            pParams: {},
            isHidden: false,
            pItemParams: {}
        },

        // ------------------- || Hiệu lực từ || -------------------
        {
            name: 'FROMDATE',
            label: 'Hiệu lực từ',
            required: true,
            dependOn: [],
            rules: [validateFRDATE],
            type: 'date',
            readOnly: {},
            metadata: { fldname: 'FROMDATE', defname: 'Hiệu lực từ', defval: null, searchcode: 'BANKACCT', type: 'date' },
            pParams: { style: { width: '100%' }, format: 'DD/MM/YYYY' },
            isHidden: false,
            pItemParams: {}
        },

        // ------------------- || Hiệu lực đến || -------------------
        {
            name: 'TODATE',
            label: 'Hiệu lực đến',
            required: false,
            dependOn: [],
            rules: [validateTODATE],
            type: 'date',
            readOnly: {},
            metadata: { fldname: 'TODATE', defname: 'Hiệu lực đến', defval: null, searchcode: 'BANKACCT', type: 'date' },
            pParams: { style: { width: '100%' }, format: 'DD/MM/YYYY' },
            isHidden: false,
            pItemParams: {}
        },
        

        // ------------------- || Tài khoản của MBF? || -------------------
        // {
        //     name: 'OWNERCD',
        //     label: 'Tài khoản của MBF?',
        //     required: true,
        //     dependOn: [],
        //     rules: [validateOWNERCD],
        //     type: 'combobox',
        //     readOnly: { edit: false, add: false },
        //     metadata: {
        //         fldname: 'OWNERCD',
        //         defname: 'Tài khoản của MBF?',
        //         defval: null,
        //         searchcode: 'BANKACCT',
        //         url: '/search/get_data_combobox',
        //         requestBody: { SEARCHCODE: 'BANKACCT', FIELDCODE: 'OWNERCD' },
        //         valueProps: 'VALUE',
        //         labelProps: 'LABEL',
        //         disabledProps: '',
        //         getFirstValue: true
        //     },
        //     pParams: { allowClear: false },
        //     isHidden: false,
        //     pItemParams: {}
        // },

        // ------------------- || Ghi chú || -------------------
        {
            name: 'NOTES',
            label: 'Ghi chú',
            required: false,
            dependOn: [],
            rules: [],
            type: 'input',
            readOnly: { edit: false, add: false },
            metadata: { fldname: 'NOTES', defname: 'Ghi chú', defval: null, searchcode: 'BANKACCT' },
            pParams: {},
            isHidden: false,
            pItemParams: {}
        }
    ]
};
// ================================ || POPUP DEFINE || ================================

// ================================ || QUICKSEARCH DEFINE || ================================
const pQuickSearchDef = {
    enable: true,
    visible: false,
    autosearch: true,
    searchCode: 'BANKACCT',
    card: null,
    layout: { column: 4, labelAlign: 'right', labelCol: { span: 6 }, wrapperCol: { span: 18 }, gutter: [16, 0], enableFooter: false },
    style: {},
    event: {
        onFieldsChange: async ({ changedFields, allFields, form, ref, setCoverLoading }) => {
            // Hàm xử lý khi các fields có sự thay đổi
            // form : Form instance
            // ref : FormRef instance
            // setCoverLoading : Hàm để set cover loading
        },
        onValuesChange: async ({ changedValues, allValues, form, ref, setCoverLoading }) => {
            // Hàm xử lý khi các values có sự thay đổi
            // form : Form instance
            // ref : FormRef instance
            // setCoverLoading : Hàm để set cover loading
            // if (changedValues.MBCODE) {
            //     const index = findContentIndexByName('BANKCD', pFormDef.content);
            //     if (index > -1) {
            //     // Gọi ref để xử lý sự kiện thông qua ref.current[index]
            //     }
            // }
            if (changedValues.FROMDATE) {
                form.setFieldsValue({ FROMDATE: changedValues.FROMDATE.format('DD/MM/YYYY') });
            }
            if (changedValues.TODATE) {
                form.setFieldsValue({ TODATE: changedValues.TODATE.format('DD/MM/YYYY') });
            }
        },
        onFinishFailed: async ({ values, errorFields, errorInfo, form, ref, toast, setCoverLoading }) => {
            // Hàm xử lý khi form submit thất bại
            // values : Giá trị của các fields
            // errorFields : Mảng các field bị lỗi
            // errorInfo : Thông tin lỗi
            // form : Form instance
            // ref : FormRef instance
            // setCoverLoading : Hàm để set cover loading

            toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại thông tin!');
        },
        onFinish: async ({ values, form, ref, toast, setCoverLoading }) => {
            // Hàm xử lý khi form submit
            // values : Giá trị của các fields
            // form : Form instance
            // ref : FormRef instance
            // toast : Toast instance
            // setCoverLoading : Hàm để set cover loading

            // Show loading cover
            setCoverLoading(true);

            // Gọi api thực thi
            // await ....
            //console.log('Received values of form: ', values);

            // Kiểm tra điều kiện và trả về thông báo
            // if (error) {
            //     toast.error("Đã có lỗi xảy ra!");
            // } else {
            //     form.resetFields();
            //     toast.success('Thành công!');
            // }

            // Tắt loading cover
            setCoverLoading(false);
        }
    },
    content: []
};

const pDefaultQuickSearch = {};
// ================================ || QUICKSEARCH DEFINE || ================================

export { columns, defaultColDef, pGridOptions, pApi, pStyleOptions, pActionDefs, pPopupFormDef, pQuickSearchDef, pDefaultQuickSearch };
