import { AfterViewInit, ElementRef, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../service/http.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { map, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { UserComponent } from '../user/user.component'
import { AddserverconfigComponent } from '../addserverconfig/addserverconfig.component'
import { Router } from '@angular/router';
import {SelectioncontrolComponent} from '../selectioncontrol/selectioncontrol.component'

@Component({
	selector: 'app-admindashboard',
	templateUrl: './admindashboard.component.html',
	styleUrls: ['./admindashboard.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AdmindashboardComponent implements OnInit, AfterViewInit {
	events: string[] = [];
	opened: boolean = true;


	editing = {};
	public temp: Array<object> = [];
	private isLoading: boolean = false;
	ColumnMode = ColumnMode;
	isEditable = {};
	serverArray = []
	@ViewChild('search', { static: false }) search: any; columnName: any;
	updatedValue: any;
	rowId: any;
	jsonData: any;
	valueArray: any = [];
	rows: any = []
	columns = [{ prop: 'id' },{prop:'selectors'} ,{ prop: 'option' }, { prop: 'product_code' }, { prop: 'cameras' }, { prop: 'form_factor' }, { prop: 'hdd_slots' }, { prop: 'availble_stroage' }, { prop: 'installed_HDDs' }, { prop: 'Max Data Rate' }, { prop: 'Display Rate' }, { prop: 'storage_range' }, { prop: 'storage_type' }, { prop: 'hdd_size' }, { prop: 'ram' }, { prop: 'video_type' }, { prop: 'monitors_supported' }, { prop: 'os_type' }, { prop: 'os_on_raid' }, { prop: 'system_type' }, { prop: 'nics' }, { prop: 'model' }, { prop: 'option' }, { prop: 'product_code' }, { prop: 'vicon_replacement' }, { prop: 'vicon_model' }, { prop: 'system' }, { prop: 'category' }, { prop: 'power_supply' }];
	spinnerEnabled = false;
	keys: string[];
	workBook: any;
	dataSheet = new Subject();
	@ViewChild('inputFile') inputFile: ElementRef;
	isExcelFile: any;
	filecheck: boolean = false;
	inputValue: string;
	file: any;
	key: any[] = [];
	value: any[] = [];
	dialogRef: any;
	fileName: any;
	username: string;
	updatedata: Object;
	selectorShadow = [
		{ name: 'Cameras', checked: true, value: 'cameras' },
		{ name: 'Max Data Rate', checked: true, value: 'max_data_rate' },
		{ name: 'Storage Range', checked: true, value: 'storage_range' },
		{ name: 'OS', checked: true, value: 'os_type' },
		{ name: 'Form factor', checked: true, value: 'form_factor' },
		{ name: 'HDD Slots - Data Drives', checked: true, value: 'hdd_slots' },
		{ name: 'Storage Type', checked: true, value: 'storage_type' },
		{ name: 'Display Rate', checked: false, value: 'display_rate' },
		{ name: 'Monitors Supported', checked: false, value: 'monitors_supported' },
		{ name: 'Dual Redundant Power Supply', checked: false, value: 'power_supply' },
		{ name: 'OS on RAID', checked: false, value: 'os_on_raid' },
		{ name: 'Category', checked: false, value: 'category' },
		{ name: 'Storage Type', checked: false, value: 'storage_type' },
		{ name: 'CPU', checked: false, value: 'cpu' },
		{ name: 'RAM', checked: false, value: 'ram' },
		{ name: 'Form factor', checked: false, value: 'form_factor' },
		{ name: 'Category', checked: false, value: 'category' },
		{ name: 'Storage Range', checked: false, value: 'storage_range' }
	  ];
	shadowColumns: unknown[];
	shadowColumnsUpdate: string[];
	seShadow: { name: string; checked: boolean; value: string; }[];
	constructor(private httpService: HttpService, public dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router) {

		// console.log(this.httpService.diaglogClosed,"admin da")

	}

	ngOnInit(): void {
		this.getServerConfigurations();
		this.username=localStorage.getItem('userName');
	}
	ngAfterViewInit(): void {
		fromEvent(this.search.nativeElement, 'keydown')
			.pipe(
				debounceTime(550),
				map(x => x['target']['value'])
			)
			.subscribe(value => {
				this.updateFilter(value);
			});
	}

	setvalue()
	{ 
		this.httpService.getUpdateColumns().subscribe(data => {
			this.updatedata = data
	
		if (data['data']['Shadow'] != null) {
			this.shadowColumns = Object.values(data['data']['Shadow']);
			// console.log("this.shadowColumns",this.shadowColumns)
			this.shadowColumnsUpdate = this.shadowColumns.map((ele: any) => {
			  return [Object.keys(ele)[0]].toString()
			})
			console.log("...", this.shadowColumnsUpdate)
  
			this.selectorShadow.forEach(element => {
			  console.log(element.value)
			  let result = this.shadowColumnsUpdate.includes(element.value);
  
			  console.log(result, "result");
			  if (result) {
				element.checked = true
			  }
			  else {
				element.checked = false
			  }
			});
			// console.log(this.selectorShadow, ",,,,")
			// this.seShadow = this.selectorShadow;
		  }
		})
	}
	// add server control dialog
	openDialog(): void {
	
		const dialogRef = this.dialog.open(AddserverconfigComponent, {
			// width: '100px',
			// disableClose: true
		});
		dialogRef.afterClosed().subscribe(result => {
			this.getServerConfigurations();
		});

	}
	// open user dialog
	openDialogUser(): void {
		const dialogRef = this.dialog.open(UserComponent, {
			// width: '700px',
			// disableClose: true
		});
		dialogRef.afterClosed().subscribe(result1 => {
			// this.getperformanceconfiguration();
		});
	}
	// open user dialog

	openDialogSelectionControl()
	{
		
		const dialogRef = this.dialog.open(SelectioncontrolComponent, {
			width: '700px',
			// disableClose: true
		});
		// this.setvalue()
		dialogRef.afterClosed().subscribe(result1 => {
			// this.getperformanceconfiguration();
		});
	}
	getServerConfigurations(): any {
		this.httpService.getServerConfigurations().subscribe(response => {
			console.log("....",response )
			this.rows = response;
			this.temp = this.rows
		})
	}



	// Serach Functionlity
	updateFilter(val: any) {
		const value = val.toString().toLowerCase().trim();
		const count = this.columns.length;
		const keys = Object.keys(this.temp[0]);
		this.rows = this.temp.filter(item => {
			for (let i = 0; i < count; i++) {
				if (
					(item[keys[i]] &&
						item[keys[i]]
							.toString()
							.toLowerCase()
							.indexOf(value) !== -1) ||
					!value
				) {
					return true;
				}
			}
		});
	}

	// To update single Row
	updateValue(event, cell, rowIndex, id) {
		this.editing[rowIndex + '-' + cell] = false;
		this.rows[rowIndex][cell] = event.target.value;
		this.rows = [...this.rows];
		this.columnName = cell;
		this.updatedValue = this.rows[rowIndex][cell];
		this.rowId = id
		const data = {
			columnName: this.columnName,
			updateValue: this.updatedValue,
			id: this.rowId
		}
		this.httpService.updateSingleValue(data).subscribe(result => {
			const response = result
			if (response['status'] == 200) {
				this.toastr.success('Record update', 'Successfully!', {
					timeOut: 5000
				});
			}
		})
	}
	checkfileUpload() {
		this.filecheck = false
	}
	// On file change
	onChange(ev) {
		this.filecheck = false
		// this.validateEmp=false;

		var files = ev.target.files;
		this.fileName = files[0].name;
		this.inputValue = (<HTMLInputElement>document.getElementById("file")).value;

		// get extension of file
		let fileExtention = this.inputValue.substring(this.inputValue.lastIndexOf(".") + 1, this.inputValue.length).toLowerCase();

		if (!(fileExtention == "xlsx" || fileExtention == "xls" || fileExtention == "csv")) {
			this.toastr.error('Please select correct file & retry.', 'Invalid File', {
				timeOut: 2000
			});
			(<HTMLInputElement>document.getElementById("file")).value = "";
			return false;
		}

		else {
			let reader = new FileReader();
			this.file = ev.target.files[0];

			// reader.readAsArrayBuffer(this.file);     
			// structure for reading file
			reader.onload = (event) => {
				const data = reader.result;
				this.workBook = XLSX.read(data, { type: 'binary' });

				// pushing sheets into array
				this.jsonData = this.workBook.SheetNames.reduce((initial, name) => {
					const sheet = this.workBook.Sheets[name];
					initial[name] = XLSX.utils.sheet_to_json(sheet);
					return initial;
				}, {});
			}
			reader.readAsBinaryString(this.file);
		}
	}

	// import the document
	import() {
		this.spinner.show();
		var list = []

		list = this.jsonData;
		if (list === undefined || list === null || list.length == 0) {
			this.toastr.error('Please select file', '', {
				timeOut: 5000
			});
			this.spinner.hide()
			return
		}
		this.serverArray = []
		this.key = [];
		this.value = [];
		this.key = Object.keys(list);
		this.value = Object.values(list);
		for (let i = 0; i < this.key.length; i++) {
			this.valueArray = this.value[i];
			this.valueArray.forEach(element => {
				this.serverArray.push({
					// selectors:this.key[i],
					cameras: element['# Cameras'],
					max_data_rate: element['Max Data Rate (Mbps)'],
					display_rate: element['Display Rate'],
					storage_range: element['Storage Range (TB)'],
					system: element['System'],
					category: element['Category'],
					form_factor: element['FF'],
					hdd_slots: element['HDD Slots'],
					available_storage: element['Available Storage'],
					installed_HDDs: element['Installed HDDs #'],
					storage_type: element['Storage Type'],
					hdd_size: element['HDD Size (TB)'],
					cpu: element['CPU'],
					ram: element['RAM'],
					video_type: element['Video Type'],
					monitors_supported: element['Monitors Supported'],
					os_type: element['OS Type'],
					os_on_raid: element['OS on RAID'],
					os_disk_size: element['OS Disk Size'],
					system_type: element['System Type'],
					seconday_ssd: element['Secondary SSD'],
					nics: element['NICs #'],
					power_supply: element['Power Supply'],
					model: element['Model'],
					option: element['Options'],
					product_code: element['Product Code'],
					vicon_replacement: element['Vicon Replacement'],
					vicon_model: element['Vicon Model']
				})

			})
			// this.inputFile.nativeElement.value = '';
		}
		this.httpService.uploadFile(this.serverArray).subscribe((data) => {
			if (data['status'] === 200) {
				this.toastr.success('Record update successfully ', 'Successfully!', {
					timeOut: 3000
				});
				this.getServerConfigurations();
				this.spinner.hide()
			}
			(<HTMLInputElement>document.getElementById("file")).value = "";
			this.jsonData = ''
			this.fileName = ''
		})


	}

	logout() {
		this.router.navigate(['/login'])
		localStorage.removeItem('token');
		localStorage.removeItem('auth')
	}
}
