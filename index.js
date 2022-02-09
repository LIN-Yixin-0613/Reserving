function Initialize() {
    if (localStorage.getItem('Initialization') == null) {
        localStorage.setItem('Initialization', 'done');
        for (var i = 1; i <= 25; i++) {
            localStorage.setItem(i+'', '0');
        }
    }
}

function Book() {
    //可能不需要一个检测是否满了的机制了 毕竟首页会知道 下面对每个座位也会有判断
    var seriesNo = document.forms["bookingForm"]["seriesNo"].value;
    if (seriesNo > 25 || seriesNo < 1) {
        alert("The seats are numbered from 1 to 25. Please enter a right serial number.");
        return;
    }
    if (localStorage.getItem(seriesNo+'') != '0') {
        alert("The seat has been reserved. Please check the available serial number again.");
        return;
    }
    var pName = document.forms["bookingForm"]["pName"].value;
    var phoneNumber = document.forms["bookingForm"]["phoneNumber"].value;
    localStorage.setItem(seriesNo+'', pName+', '+phoneNumber+', '+(Date.parse(new Date())+''))
    alert("Successfully reserved.");
}

function Cancel() {
    var cSeriesNo = document.forms["cancelForm"]["cSeriesNo"].value;
    if (cSeriesNo > 25 || cSeriesNo < 1) {
        alert("The seats are numbered from 1 to 25. Please enter a right serial number.");
        return;
    }
    if (localStorage.getItem(cSeriesNo+'') == '0') {
        alert("The seat is still available. Please enter a reserved serial number.");
        return;
    }
    localStorage.setItem(cSeriesNo+'', '0')
    alert("Successfully cancelled.")
}

function RList() {
    table = document.createElement("table");
	tBody = document.createElement("tBody");
	for(var i=0;i<=25;i++){
		tr = document.createElement("tr");
		tBody.appendChild(tr);
        tt = ['Serial No.', 'Name', 'Phone Number', 'Timestamp']
		for(var j=0;j<4;j++){
			td = document.createElement("td");
			tr.appendChild(td);
            if (i==0) {
                td.innerHTML="<strong>"+tt[j]+"<\strong>";
            } else {
                if (j == 0) {
                    td.innerHTML=i;
                } else {
                    info = localStorage.getItem(i);
                    if (info == '0') {
                        td.innerHTML='No Reservation';
                    } else {
                        info_list = info.split(',');
                        td.innerHTML = info_list[j-1];
                    }
                }
            }
		}
	}
	table.appendChild(tBody);
	document.body.appendChild(table);
}