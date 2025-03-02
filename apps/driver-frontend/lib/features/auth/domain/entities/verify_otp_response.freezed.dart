// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'verify_otp_response.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$VerifyOtpResponse {
  String get jwtToken => throw _privateConstructorUsedError;
  ProfileFullEntity get driverFullProfile => throw _privateConstructorUsedError;
  bool get hasPassword => throw _privateConstructorUsedError;

  /// Create a copy of VerifyOtpResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $VerifyOtpResponseCopyWith<VerifyOtpResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $VerifyOtpResponseCopyWith<$Res> {
  factory $VerifyOtpResponseCopyWith(
          VerifyOtpResponse value, $Res Function(VerifyOtpResponse) then) =
      _$VerifyOtpResponseCopyWithImpl<$Res, VerifyOtpResponse>;
  @useResult
  $Res call(
      {String jwtToken, ProfileFullEntity driverFullProfile, bool hasPassword});

  $ProfileFullEntityCopyWith<$Res> get driverFullProfile;
}

/// @nodoc
class _$VerifyOtpResponseCopyWithImpl<$Res, $Val extends VerifyOtpResponse>
    implements $VerifyOtpResponseCopyWith<$Res> {
  _$VerifyOtpResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of VerifyOtpResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? jwtToken = null,
    Object? driverFullProfile = null,
    Object? hasPassword = null,
  }) {
    return _then(_value.copyWith(
      jwtToken: null == jwtToken
          ? _value.jwtToken
          : jwtToken // ignore: cast_nullable_to_non_nullable
              as String,
      driverFullProfile: null == driverFullProfile
          ? _value.driverFullProfile
          : driverFullProfile // ignore: cast_nullable_to_non_nullable
              as ProfileFullEntity,
      hasPassword: null == hasPassword
          ? _value.hasPassword
          : hasPassword // ignore: cast_nullable_to_non_nullable
              as bool,
    ) as $Val);
  }

  /// Create a copy of VerifyOtpResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $ProfileFullEntityCopyWith<$Res> get driverFullProfile {
    return $ProfileFullEntityCopyWith<$Res>(_value.driverFullProfile, (value) {
      return _then(_value.copyWith(driverFullProfile: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$VerifyOtpResponseImplCopyWith<$Res>
    implements $VerifyOtpResponseCopyWith<$Res> {
  factory _$$VerifyOtpResponseImplCopyWith(_$VerifyOtpResponseImpl value,
          $Res Function(_$VerifyOtpResponseImpl) then) =
      __$$VerifyOtpResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String jwtToken, ProfileFullEntity driverFullProfile, bool hasPassword});

  @override
  $ProfileFullEntityCopyWith<$Res> get driverFullProfile;
}

/// @nodoc
class __$$VerifyOtpResponseImplCopyWithImpl<$Res>
    extends _$VerifyOtpResponseCopyWithImpl<$Res, _$VerifyOtpResponseImpl>
    implements _$$VerifyOtpResponseImplCopyWith<$Res> {
  __$$VerifyOtpResponseImplCopyWithImpl(_$VerifyOtpResponseImpl _value,
      $Res Function(_$VerifyOtpResponseImpl) _then)
      : super(_value, _then);

  /// Create a copy of VerifyOtpResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? jwtToken = null,
    Object? driverFullProfile = null,
    Object? hasPassword = null,
  }) {
    return _then(_$VerifyOtpResponseImpl(
      jwtToken: null == jwtToken
          ? _value.jwtToken
          : jwtToken // ignore: cast_nullable_to_non_nullable
              as String,
      driverFullProfile: null == driverFullProfile
          ? _value.driverFullProfile
          : driverFullProfile // ignore: cast_nullable_to_non_nullable
              as ProfileFullEntity,
      hasPassword: null == hasPassword
          ? _value.hasPassword
          : hasPassword // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc

class _$VerifyOtpResponseImpl implements _VerifyOtpResponse {
  const _$VerifyOtpResponseImpl(
      {required this.jwtToken,
      required this.driverFullProfile,
      required this.hasPassword});

  @override
  final String jwtToken;
  @override
  final ProfileFullEntity driverFullProfile;
  @override
  final bool hasPassword;

  @override
  String toString() {
    return 'VerifyOtpResponse(jwtToken: $jwtToken, driverFullProfile: $driverFullProfile, hasPassword: $hasPassword)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$VerifyOtpResponseImpl &&
            (identical(other.jwtToken, jwtToken) ||
                other.jwtToken == jwtToken) &&
            (identical(other.driverFullProfile, driverFullProfile) ||
                other.driverFullProfile == driverFullProfile) &&
            (identical(other.hasPassword, hasPassword) ||
                other.hasPassword == hasPassword));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, jwtToken, driverFullProfile, hasPassword);

  /// Create a copy of VerifyOtpResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$VerifyOtpResponseImplCopyWith<_$VerifyOtpResponseImpl> get copyWith =>
      __$$VerifyOtpResponseImplCopyWithImpl<_$VerifyOtpResponseImpl>(
          this, _$identity);
}

abstract class _VerifyOtpResponse implements VerifyOtpResponse {
  const factory _VerifyOtpResponse(
      {required final String jwtToken,
      required final ProfileFullEntity driverFullProfile,
      required final bool hasPassword}) = _$VerifyOtpResponseImpl;

  @override
  String get jwtToken;
  @override
  ProfileFullEntity get driverFullProfile;
  @override
  bool get hasPassword;

  /// Create a copy of VerifyOtpResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$VerifyOtpResponseImplCopyWith<_$VerifyOtpResponseImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
