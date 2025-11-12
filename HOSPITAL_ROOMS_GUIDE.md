# Hospital Rooms Guide - Bulalacao Health Hub

This document describes all the room types available in the Bulalacao Health Hub system, organized by category.

## Room Categories Overview

1. **Patient Rooms** - For patient care and accommodation
2. **Treatment and Procedure Rooms** - For medical procedures and emergencies
3. **Support and Diagnostic Rooms** - For medical imaging and diagnostics
4. **Administrative Support Rooms** - For hospital administration
5. **Other Support Rooms** - For staff and visitor support

---

## 1. Patient Rooms

### Patient Room
- **Code**: `patient_room`
- **Room Numbers**: PR-101 to PR-105
- **Description**: Standard hospital room for overnight or longer stays
- **Typical Capacity**: 1 patient
- **Features**: Basic medical monitoring, comfortable bed, visitor seating

### Private Room
- **Code**: `private_room`
- **Room Numbers**: PVT-201 to PVT-204
- **Description**: Single occupancy room with enhanced privacy
- **Typical Capacity**: 1 patient
- **Features**: Private bathroom, window views, enhanced comfort amenities, more space

### Isolation Room
- **Code**: `isolation_room`
- **Room Numbers**: ISO-301 to ISO-303
- **Description**: Used to prevent the spread of infectious diseases
- **Typical Capacity**: 1 patient
- **Features**: Negative pressure systems, airlock entry, specialized ventilation, strict access control

### ICU Room
- **Code**: `icu_room`
- **Room Numbers**: ICU-401 to ICU-405
- **Description**: Intensive Care Unit for patients needing advanced, round-the-clock monitoring
- **Typical Capacity**: 1 patient
- **Features**: Advanced monitoring equipment, ventilators, 24/7 specialized nursing, life support systems

### NICU Room
- **Code**: `nicu_room`
- **Room Numbers**: NICU-501 to NICU-503
- **Description**: Neonatal Intensive Care Unit for premature or critically ill newborns
- **Typical Capacity**: 6 incubators per room
- **Features**: Incubators, phototherapy lights, specialized neonatal equipment, temperature control

---

## 2. Treatment and Procedure Rooms

### Operating Room
- **Code**: `operating_room`
- **Room Numbers**: OR-01 to OR-04
- **Description**: Designed for surgery with strict sterile protocols
- **Typical Capacity**: 1 patient
- **Features**: Surgical lights, anesthesia equipment, sterile environment, advanced monitoring

### Delivery Room
- **Code**: `delivery_room`
- **Room Numbers**: DR-01 to DR-03
- **Description**: Specialized room for childbirth with obstetric teams
- **Typical Capacity**: 1 patient + support person
- **Features**: Birthing bed, fetal monitoring, emergency equipment, neonatal resuscitation

### Emergency Room
- **Code**: `emergency_room`
- **Room Numbers**: ER-01 to ER-05
- **Description**: 24/7 care for acute illness or trauma
- **Typical Capacity**: 1 patient per bay
- **Features**: Rapid response equipment, trauma supplies, immediate access, defibrillators

---

## 3. Support and Diagnostic Rooms

### X-Ray Room
- **Code**: `xray_room`
- **Room Numbers**: XRAY-01 to XRAY-03
- **Description**: For radiographic imaging diagnostics
- **Typical Capacity**: 1 patient
- **Features**: X-ray machine, lead shielding, digital imaging, PACS integration

### MRI Room
- **Code**: `mri_room`
- **Room Numbers**: MRI-01 to MRI-02
- **Description**: Magnetic resonance imaging with specialized shielding
- **Typical Capacity**: 1 patient
- **Features**: MRI scanner, magnetic shielding, non-ferrous equipment, contrast capability

### CT Scan Room
- **Code**: `ct_scan_room`
- **Room Numbers**: CT-01 to CT-02
- **Description**: Computerized tomography for detailed imaging
- **Typical Capacity**: 1 patient
- **Features**: CT scanner, contrast injection equipment, rapid imaging, 3D reconstruction

### Laboratory Room
- **Code**: `laboratory_room`
- **Room Numbers**: LAB-01 to LAB-03
- **Description**: Medical laboratory for testing and analysis
- **Typical Capacity**: 3-5 staff members
- **Features**: Lab equipment, microscopes, testing machines, sample storage, safety equipment

---

## 4. Administrative Support Rooms

### Administrative Office
- **Code**: `admin_office`
- **Room Numbers**: ADMIN-01 to ADMIN-03
- **Description**: Hospital administration and management offices
- **Typical Capacity**: 2-5 staff members
- **Features**: Desks, computers, filing systems, meeting space

### Medical Records Department
- **Code**: `medical_records`
- **Room Numbers**: MR-01 to MR-02
- **Description**: Storage and management of patient medical records
- **Typical Capacity**: 4-8 staff members
- **Features**: Secure filing systems, computer workstations, scanning equipment, HIPAA compliant storage

### Billing Department
- **Code**: `billing_dept`
- **Room Numbers**: BILL-01 to BILL-02
- **Description**: Patient billing and insurance processing
- **Typical Capacity**: 4-6 staff members
- **Features**: Computer workstations, secure payment processing, phone systems, filing cabinets

### IT Department
- **Code**: `it_dept`
- **Room Numbers**: IT-01 to IT-02
- **Description**: Information technology support and infrastructure
- **Typical Capacity**: 3-5 staff members
- **Features**: Server racks, workstations, network equipment, technical tools

---

## 5. Other Support Rooms

### Nurse Station
- **Code**: `nurse_station`
- **Room Numbers**: NS-1F to NS-4F (one per floor)
- **Description**: Central hub for nursing staff on each floor
- **Typical Capacity**: 4 nurses
- **Features**: Computer workstations, medication carts, patient monitoring displays, communication systems

### Doctor Office
- **Code**: `doctor_office`
- **Room Numbers**: DOC-01 to DOC-05
- **Description**: Private offices for physicians
- **Typical Capacity**: 2 people (doctor + patient/colleague)
- **Features**: Desk, examination area, computer, medical references, private consultation space

### Waiting Room
- **Code**: `waiting_room`
- **Room Numbers**: WAIT-1F, WAIT-2F, WAIT-ER, WAIT-OPD
- **Description**: Comfortable areas for patients and families to wait
- **Typical Capacity**: 25-50 people depending on location
- **Features**: Comfortable seating, TV, magazines, vending machines, Wi-Fi, restrooms nearby

## Room Status Types

- **Available**: Room is ready for patient admission
- **Occupied**: Room is currently in use by patient(s)
- **Maintenance**: Room is being cleaned, repaired, or undergoing maintenance

---

## Room Summary Statistics

| Category | Room Types | Total Rooms |
|----------|-----------|-------------|
| Patient Rooms | 5 types | 21 rooms |
| Treatment & Procedure | 3 types | 12 rooms |
| Support & Diagnostic | 4 types | 10 rooms |
| Administrative Support | 4 types | 9 rooms |
| Other Support | 3 types | 12 rooms |
| **TOTAL** | **19 types** | **64 rooms** |

## Room Status Types

- **Available**: Room is ready for patient admission or use
- **Occupied**: Room is currently in use by patient(s) or staff
- **Maintenance**: Room is being cleaned, repaired, or undergoing maintenance

## Usage Guidelines

1. **Room Numbers**: Use a consistent naming convention (e.g., ICU-401, ER-01, NICU-501)
2. **Capacity**: Set realistic capacity based on room type and size
3. **Status Updates**: Keep room status current for accurate availability tracking
4. **Occupancy Tracking**: Update current_occupants when patients are admitted or discharged
5. **Category Filtering**: Use the category filter to quickly find specific room types

## Adding New Rooms

To add a new room through the interface:
1. Click the "Add Room" button
2. Enter a unique room number (follow naming conventions)
3. Select the appropriate room type from the dropdown
4. Set the capacity based on room size and purpose
5. Choose the initial status (usually "available")
6. Submit the form

The system will automatically:
- Track occupancy levels
- Display room availability statistics
- Show color-coded status indicators
- Organize rooms by category
- Calculate utilization rates

## Quick Reference - Room Codes

**Patient Rooms**: `patient_room`, `private_room`, `isolation_room`, `icu_room`, `nicu_room`

**Treatment & Procedure**: `operating_room`, `delivery_room`, `emergency_room`

**Support & Diagnostic**: `xray_room`, `mri_room`, `ct_scan_room`, `laboratory_room`

**Administrative**: `admin_office`, `medical_records`, `billing_dept`, `it_dept`

**Other Support**: `nurse_station`, `doctor_office`, `waiting_room`
